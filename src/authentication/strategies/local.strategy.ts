import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }
  validate(email, password) {
    const user = this.authService.login({ email, password });
    if (!user) throw UnauthorizedException;
    return user;
  }
}
