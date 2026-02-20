import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsNumber, IsString, MaxDate } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Type(() => Date) // Essential: transforms the incoming string to a Date object
  @IsDate({ message: 'Date of birth must be a valid date instance' })
  @MaxDate(() => new Date(), { message: 'Date of birth cannot be in the future' })
  readonly dateOfBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly uniqueId: number

}

