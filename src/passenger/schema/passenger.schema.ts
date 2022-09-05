/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema(
  {
    passengerName: { type: String, required: true },
    passengerEmail: { type: String, required: true },
  },
);

PassengerSchema.index({ passengerEmail: 1 }, { unique: true });
