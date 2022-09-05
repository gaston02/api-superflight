/* eslint-disable prettier/prettier */
import { IPassenger } from './passenger.interface';

export interface IFlight extends Document {
  pilotName: string;
  airplaneName: string;
  destinationCity: string;
  flightDate: Date;
  passengers: IPassenger[];
}
