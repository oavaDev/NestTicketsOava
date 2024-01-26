import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: { email: string; username: string }) {
    return this.jwtService.sign(payload);
  }
  verifyToken(token: string): { email: string } {
    return this.jwtService.verify(token);
  }
}
