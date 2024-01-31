import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './interfaces/authRegisterDto.entity';
import { AuthLoginDto } from './interfaces/authLoginDto.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    const token = await this.authenticationService.login(authLoginDto);
    if (!token) {
      throw new HttpException('Invalid email/password', HttpStatus.BAD_REQUEST);
    }
    return token;
  }
  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    const user = await this.authenticationService.register(authRegisterDto);
    return user;
  }
}
