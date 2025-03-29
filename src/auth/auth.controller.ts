import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Handle user login and return a JWT token
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const { username, password } = loginDto;
    const valid = await this.authService.validateUser(username, password);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    return await this.authService.generateAccessToken(username);
  }
}
