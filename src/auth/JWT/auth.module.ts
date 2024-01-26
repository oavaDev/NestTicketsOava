import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
