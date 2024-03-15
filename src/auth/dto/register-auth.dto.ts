import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;
}
