import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
// Check if a provided username already exists in the database
export class ExistUserUsernamePipe implements PipeTransform {
  constructor(private usersService: UsersService) {}

  async transform(value: any) {
    const count: number = await this.usersService.usernameAlreadyExists(value);
    if (count > 0) {
      throw new BadRequestException('Username already exists');
    }
    return value;
  }
}