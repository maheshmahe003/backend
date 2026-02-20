import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, MaxDate } from "class-validator";

export class CreateUserRegDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string
  
  @IsString()
  @IsNotEmpty()
  readonly password: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Type(() => Date) // Essential: transforms the incoming string to a Date object
  @IsDate({ message: 'Date of birth must be a valid date instance' })
  @MaxDate(() => new Date(), { message: 'Date of birth cannot be in the future' })
  readonly dateOfBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly govtId: number

}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string

}