import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [AuthModule, PrismaModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, MailService],
})
export class AppModule {}
