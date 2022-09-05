/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly userEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userPassword: string;
}
