import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './interfaces/authRegisterDto.entity';
import { AuthLoginDto } from './interfaces/authLoginDto.entity';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return await this.authenticationService.login(authLoginDto);
  }
  @Post('register')
  @UseGuards(JwtAuthGuard)
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return await this.authenticationService.register(authRegisterDto);
  }
  @Post('validate')
  async validate(@Body() authLoginDto: AuthLoginDto) {
    return await this.authenticationService.validate(authLoginDto);
  }
}
