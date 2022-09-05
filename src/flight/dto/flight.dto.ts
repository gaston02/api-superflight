/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class FlightDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly pilotName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly airplaneName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destinationCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly flightDate: Date;
}
