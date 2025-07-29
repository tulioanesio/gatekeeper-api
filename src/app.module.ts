import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, PrismaModule, MailModule, ProductModule],
  controllers: [AuthController, ProductController],
  providers: [AuthService, PrismaService, MailService, ProductService],
})
export class AppModule {}
