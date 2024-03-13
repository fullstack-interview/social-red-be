import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;
  @IsPositive()
  age: number;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  fullName?: string;
  @IsPositive()
  age?: number;
  @IsNotEmpty()
  email?: string;
  @IsNotEmpty()
  password?: string;
}
