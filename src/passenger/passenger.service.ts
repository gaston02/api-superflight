import { Injectable, HttpStatus } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async createPassenger(payload: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model({ ...payload });
    return await newPassenger.save();
  }

  async findAllPassenger(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findPassenger(passengerId: string): Promise<IPassenger> {
    return await this.model.findById(passengerId);
  }

  async updatePassenger(
    passengerId: string,
    payload: PassengerDTO,
  ): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(passengerId, payload, {
      new: true,
    });
  }

  async deletePassenger(passengerId: string) {
    await this.model.findByIdAndDelete(passengerId);
    return { status: HttpStatus.OK, msg: 'Passenger Deleted successfully' };
  }
}
