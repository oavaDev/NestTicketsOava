import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { generateHashedPassword } from '../auth/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async register(user: createUserDto) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      return 'User already exists';
    }
    user.password = await generateHashedPassword(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async delete(email: string) {
    const userToDelete = this.userModel.findOneAndDelete({ email: email });
    await this.userModel.deleteOne(userToDelete).exec();
  }
}
