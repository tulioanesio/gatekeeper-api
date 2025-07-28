import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dtos/login-user-dto';
import { RegisterDTO } from 'src/auth/dtos/register-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(data: RegisterDTO) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    await this.mailService.sendMail(
      user.email,
      '🎉 Bem-vindo à nossa plataforma!',
      'Seu cadastro foi realizado com sucesso.',
      `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #f9f9f9; color: #333;">
    <h2 style="color: #2c3e50;">Olá, ${user.name}! 👋</h2>
    <p style="font-size: 16px;">Estamos muito felizes em ter você conosco!</p>
    
    <p style="font-size: 16px;">
      Seu cadastro foi realizado com sucesso. Agora você pode acessar nossa plataforma, explorar os produtos disponíveis e aproveitar todos os recursos.
    </p>

    <div style="margin: 30px 0;">
      <a href="#" 
         style="display: inline-block; background-color: #2ecc71; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold;">
        Acessar Plataforma
      </a>
    </div>

    <p style="font-size: 14px; color: #7f8c8d;">Se você não se cadastrou em nossa plataforma, pode ignorar este e-mail.</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

    <p style="font-size: 12px; color: #95a5a6;">Tulio - TestApp</p>
  </div>
  `,
    );

    return { message: 'User registered successfully', accessToken };
  }

  async login(data: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const acessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { message: 'User logged in successfully', acessToken };
  }
}
