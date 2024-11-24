import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

}
