import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './interfaces/authRegisterDto.entity';
import { AuthLoginDto } from './interfaces/authLoginDto.entity';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() authLoginDto: AuthLoginDto) {
    const user = await this.authenticationService.login(authLoginDto);
    return user;
  }
  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this.authenticationService.register(authRegisterDto);
  }
}
