import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async createFlight(payload: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(payload);
    return await newFlight.save();
  }

  async findAllFlights(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findFlight(flightId: string): Promise<IFlight> {
    return await (await this.model.findById(flightId)).populate('passengers');
  }

  async updateFlight(flightId: string, payload: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(flightId, payload, { new: true });
  }

  async deleteFlight(flightId: string) {
    await this.model.findByIdAndDelete(flightId);
    return {
      status: HttpStatus.OK,
      msg: 'Flight Deleted successfully',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passengers');
  }
}
