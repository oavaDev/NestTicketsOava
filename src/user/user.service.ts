import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import { generateHashedPassword, verifyHashAndPassword } from '../auth/bcrypt/bcrypt/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async login(userToLogin: loginUserDto) {
    const user = await this.userModel.findOne({ email: userToLogin.email });
    const passwordsMatch = await verifyHashAndPassword(
      userToLogin.password,
      user.password,
    );
    if (passwordsMatch) {
      return user;
    } else {
      return 'Invalid credentials';
    }
  }
  async register(user: createUserDto) {
    user.password = await generateHashedPassword(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async delete(email: string) {
    const userToDelete = this.userModel.findOneAndDelete({ email: email });
    await this.userModel.deleteOne(userToDelete).exec();
  }
}
