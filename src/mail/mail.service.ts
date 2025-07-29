import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private jwtService: JwtService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-1.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    return transporter;
  }
  async sendMail(to: string, subject: string, text: string, html?: string) {
    const transporter = this.mailTransport();
    await transporter.sendMail({
       from: `"MyApp" <${process.env.DOMAIN_MAIL}>`,
      to,
      subject,
      text,
      html,
    });
  }
}
