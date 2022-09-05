import { Injectable, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

  async checkPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, userPassword);
  }

  async findByUserName(userName: string) {
    return await this.model.findOne({ userName });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async createUser(payload: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(payload.userPassword);
    const newUser = new this.model({ ...payload, userPassword: hash });
    return await newUser.save();
  }

  async findAllUsers(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findUser(userId: string): Promise<IUser> {
    return await this.model.findById(userId);
  }

  async updateUser(userId: string, payload: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(payload.userPassword);
    const user = { ...payload, userPassword: hash };
    return await this.model.findByIdAndUpdate(userId, user, { new: true });
  }

  async deleteUser(userId: string) {
    await this.model.findByIdAndDelete(userId);
    return { status: HttpStatus.OK, msg: 'User deleted successfully' };
  }
}
