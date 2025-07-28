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
      where: { email: data.email },
    });
    if (userExists) throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const verificationToken = await this.jwtService.signAsync(
      { name: data.name, email: data.email, password: hashedPassword },
      { secret: process.env.JWT_VERIFICATION_SECRET, expiresIn: '1h' },
    );

    const verifyUrl = `http://localhost:3000/verify?token=${verificationToken}`;
    await this.mailService.sendMail(
      data.email,
      'Confirme seu cadastro',
      'Clique no link para ativar sua conta.',
      `<<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 12px; background-color: #f4f6f8; color: #2c3e50; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
  <h2 style="margin-top: 0; font-weight: 700;">Hi, ${data.name}! 👋</h2>
  <p style="font-size: 16px; line-height: 1.5;">
    We are very happy to have you with us!
  </p>

  <p style="font-size: 16px; line-height: 1.5;">
    To complete your registration, please click the button below and confirm your email.
  </p>

  <div style="text-align: center; margin: 35px 0;">
    <a href="${verifyUrl}" 
       style="background-color: #27ae60; color: white; padding: 14px 32px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; box-shadow: 0 4px 12px rgba(39, 174, 96, 0.5); transition: background-color 0.3s ease;">
      Confirm registration
    </a>
  </div>

  <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
    If you haven't registered on our platform, you can simply ignore this email.
  </p>

  <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;" />

  <p style="font-size: 12px; color: #95a5a6; text-align: center;">
    Tulio - TestApp
  </p>
</div>
`,
    );

    return {
      message: 'A verification email has been sent to your inbox.',
    };
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

  async verifyUser(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_VERIFICATION_SECRET,
      });

      const existingUser = await this.prismaService.user.findUnique({
        where: { email: payload.email },
      });
      if (existingUser) {
        throw new UnauthorizedException('User already verified');
      }

      // Cria o usuário definitivo no banco
      const user = await this.prismaService.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        },
      });

      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        message: 'User verified and registered successfully',
        accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
