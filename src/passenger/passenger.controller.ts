import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('passengers')
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @ApiOperation({ summary: 'Create Passenger' })
  createPassenger(@Body() payload: PassengerDTO) {
    return this.passengerService.createPassenger(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Passengers' })
  findAllPassenger() {
    return this.passengerService.findAllPassenger();
  }

  @Get(':passegerId')
  @ApiOperation({ summary: 'Find one Passenger' })
  findPassenger(@Param('passegerId') passegerId: string) {
    return this.passengerService.findPassenger(passegerId);
  }

  @Put(':passengerId')
  @ApiOperation({ summary: 'Update Passenger' })
  updatePassenger(
    @Param('passengerId') passengerId: string,
    @Body() payload: PassengerDTO,
  ) {
    return this.passengerService.updatePassenger(passengerId, payload);
  }

  @Delete(':passengerId')
  @ApiOperation({ summary: 'Delete Passenger' })
  deletePassenger(@Param('passengerId') passengerId: string) {
    return this.passengerService.deletePassenger(passengerId);
  }
}
