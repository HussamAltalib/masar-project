import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Import UserModule
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy'; // Import LocalStrategy
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [
    UserModule, // Import UserModule to use UserService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // Use environment variable for secret key
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
