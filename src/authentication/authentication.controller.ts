import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthRegisterDto } from './interfaces/authRegisterDto.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authenticationService.login(authRegisterDto);
  }
}
