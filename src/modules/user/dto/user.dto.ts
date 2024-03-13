import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsPositive()
  age: number;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  name?: string;
  @IsPositive()
  age?: number;
  @IsNotEmpty()
  email?: string;
  @IsNotEmpty()
  password?: string;
}
