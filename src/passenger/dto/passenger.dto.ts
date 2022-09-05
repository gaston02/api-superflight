/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PassengerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly passengerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly passengerEmail: string;
}
