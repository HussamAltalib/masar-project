import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey', // Make sure JWT_SECRET is set in your env
    });
  }

  async validate(payload: any) {
    console.log("Payload in JwtStrategy:", payload); // Debugging log
    return { userId: payload.sub, username: payload.username }; // Update this line
  }
}
