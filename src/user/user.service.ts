import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }
  async delete(email: string) {
    const userToDelete = this.userModel.findOneAndDelete({ email: email });
    await this.userModel.deleteOne(userToDelete).exec();
  }
}
