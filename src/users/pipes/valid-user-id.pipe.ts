import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
// Check if a user exists given an ID
export class ValidUserIdPipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(value: any) {
    const user = await this.usersService.getUserById(value);
    if (!user) throw new BadRequestException("User ID doesn't exist");
    return value;
  }
}