import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  body?: string;
}