import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsOptional()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[^\da-zA]).{8,}$/, {message: 'password must contain atleast One Uppercase, One number, and One special key'})
  password: string;
    

}


