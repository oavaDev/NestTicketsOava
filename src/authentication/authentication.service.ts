import { Injectable } from '@nestjs/common';
import {
  generateHashedPassword,
  verifyHashAndPassword,
} from '../security/bcrypt/bcrypt';
import { AuthLoginDto } from './interfaces/authLoginDto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './interfaces/authRegisterDto.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userToLogin: AuthLoginDto) {
    const user = await this.userModel.findOne({ email: userToLogin.email });
    if (!user) {
      return null;
    }
    const passwordsMatch = await verifyHashAndPassword(
      userToLogin.password,
      user.password,
    );
    if (passwordsMatch) {
      const token = this.jwtService.sign({
        email: user.email,
        username: user.username,
      });
      return {
        access_token: token,
      };
    } else {
      return null;
    }
  }
  async register(user: AuthRegisterDto) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
      return 'User already exists';
    }
    user.password = await generateHashedPassword(user.password);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async validate(userToValidate: AuthLoginDto) {
    const user = await this.userModel.findOne({ email: userToValidate.email });
    if (!user) {
      return null;
    }
    const passwordsMatch = await verifyHashAndPassword(
      userToValidate.password,
      user.password,
    );
    if (passwordsMatch) {
      return user;
    } else {
      return null;
    }
  }
}
