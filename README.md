<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Gatekeeper API

This is a **learning-focused** project that implements an authentication system with **account confirmation via email**, using:

- NestJS
- PostgreSQL (via Prisma ORM)
- Nodemailer
- Amazon SES (Simple Email Service)

## Features

- User registration with email verification link
- Email confirmation via JWT token (valid for 1 hour)
- Login only after email verification
- Password hashing with Bcrypt
- JWT for session management

---

## Tech Stack

| Technology     | Purpose                                  |
|----------------|-------------------------------------------|
| NestJS         | Back-end framework (TypeScript + Node.js) |
| Prisma         | ORM for PostgreSQL                        |
| PostgreSQL     | Relational database                       |
| Nodemailer     | Email delivery library                    |
| Amazon SES     | Scalable email service by AWS             |
| Bcrypt         | Secure password hashing                   |
| JWT            | Token-based authentication                |

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/nest-auth-email.git
cd nest-auth-email

# Install dependencies
npm install
```

## Enviroment variables
```bash
# .env Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/nest_auth_db"

JWT_SECRET=your_jwt_secret
JWT_VERIFICATION_SECRET=your_email_verification_secret

MAIL_HOST="your_host"
DOMAIN_MAIL="noreply@yourdomain.com"
MAIL_USER="your_email_user"
MAIL_PASS="your_email_password"
```

## Run migrations
```bash
npx prisma migrate dev --name init
```

## Start project
```bash
pnpm run start:dev

# The server will be running at http://localhost:3000
```

## Routes

- `POST /register`: Sends a confirmation email with a verification link and registers a new user.  
- `POST /login`: Logs in an existing user.  
- `GET /verify`: Verifies the user’s email using the `JWT_VERIFICATION_SECRET` sent by email.  
- `GET /me`: Returns the authenticated user’s data. Requires a valid JWT access token in the `Authorization` header.




