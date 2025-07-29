import { Options } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length, Matches } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  @Matches(/^[a-zA-Z \-\']+$/, {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(6, 128, { message: 'Password must be between 6 and 128 characters' })
  @IsStrongPassword({ minLength: 6, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 })
  password: string;
}
