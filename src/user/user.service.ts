import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async create(createCat: createUserDto) {
    const createdUser = new this.userModel(createCat);
    return createdUser.save();
  }
  async delete(email: string) {
    const userToDelete = this.userModel.findOneAndDelete({ email: email });
    await this.userModel.deleteOne(userToDelete).exec();
  }
}
