import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  userId: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  content?: string;
  @IsNotEmpty()
  likes?: number;
}
