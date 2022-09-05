import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flights')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Flight' })
  createFlight(@Body() payload: FlightDTO) {
    return this.flightService.createFlight(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Find all Flights' })
  findAllFlights() {
    return this.flightService.findAllFlights();
  }

  @Get(':flightId')
  @ApiOperation({ summary: 'Find one Flight' })
  findFlight(@Param('flightId') flightId: string) {
    return this.flightService.findFlight(flightId);
  }

  @Put(':flightId')
  @ApiOperation({ summary: 'Update Flight' })
  updateFlight(
    @Param('flightId') flightId: string,
    @Body() payload: FlightDTO,
  ) {
    return this.flightService.updateFlight(flightId, payload);
  }

  @Delete(':flightId')
  @ApiOperation({ summary: 'Delete Flight' })
  deleteFlight(@Param('flightId') flightId: string) {
    return this.flightService.deleteFlight(flightId);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Add Passenger to Flight' })
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findPassenger(passengerId);
    if (!passenger)
      throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
