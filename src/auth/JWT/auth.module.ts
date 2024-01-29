import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env['JWT_SECRET'],
        signOptions: { expiresIn: '2h' },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
