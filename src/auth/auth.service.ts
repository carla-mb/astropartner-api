import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

export interface JWTPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      // Compare hashed passwords
      return bcrypt.compare(password, user.password);
    }
    return false;
  }

  // Generate JWT access token for authenticated user
  async generateAccessToken(username: string) {
    const user = await this.usersService.getUserByUsername(username);
    const payload: JWTPayload = { userId: user.userId };
    return {
      userId: user.userId,
      access_token: this.jwtService.sign(payload),
    };
  }
}
