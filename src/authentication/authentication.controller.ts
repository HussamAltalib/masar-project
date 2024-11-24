import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  // Endpoint for user registration
  @Post('register')
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return this.authenticationService.register(registerRequestDto);
  }

  // Endpoint for user login
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }
}
