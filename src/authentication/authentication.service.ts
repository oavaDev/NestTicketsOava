import { Injectable } from '@nestjs/common';
import { verifyHashAndPassword } from '../auth/bcrypt/bcrypt';
import { AuthLoginDto } from './interfaces/authLoginDto.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtAuthService } from '../auth/JWT/jwt-auth.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}
  async login(userToLogin: AuthLoginDto) {
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
}
