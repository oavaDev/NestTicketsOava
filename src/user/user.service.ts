import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/createUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import {
  generateHashedPassword,
  verifyHashAndPassword,
} from '../auth/bcrypt/bcrypt';
import { JwtAuthService } from '../auth/JWT/jwt-auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }
  async login(userToLogin: loginUserDto) {
    const user = await this.userModel.findOne({ email: userToLogin.email });
    if (!user) {
      return 'Invalid credentials';
    }
    const passwordsMatch = await verifyHashAndPassword(
      userToLogin.password,
      user.password,
    );
    if (passwordsMatch) {
      const token = this.jwtAuthService.generateToken({
        email: user.email,
        username: user.username,
      });
      return { access_token: token };
    } else {
      return 'Invalid credentials';
    }
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
