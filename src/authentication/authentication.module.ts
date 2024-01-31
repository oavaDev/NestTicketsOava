import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AuthModule } from '../auth/JWT/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../user/schemas/user.schema';
import { JwtAuthService } from '../auth/JWT/jwt-auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAuthService],
})
export class AuthenticationModule {}
