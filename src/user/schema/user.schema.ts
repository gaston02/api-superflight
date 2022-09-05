/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ userName: 1 }, { unique: true });
UserSchema.index({ userEmail: 1 }, { unique: true });