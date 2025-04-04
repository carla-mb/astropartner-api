import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';
import { PostEntity } from 'src/posts/post.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private userMapper: UserMapper,
  ) {}

  // Retrieve all users and convert them to DTOs
  async getAllUsers(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.usersRepository.getAllUsers();
    return users.map(user => this.userMapper.entityToDto(user));
  }
  
   // Retrieve user by ID and convert to DTO
  async getUserById(userId: string): Promise<UserDto> {
    const user: UserEntity = await this.usersRepository.getUserById(userId);
    return this.userMapper.entityToDto(user);
  }

  // Find user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByUsername(username);
  }

  // Check if provided username already exists
  async usernameAlreadyExists(username: string): Promise<number> {
    const count = await this.usersRepository.usernameAlreadyExists(username);
    return count;
  }

  // Compute zodiac sign based on birth date
  private computeZodiacSign(birthDate: Date): string {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
  
    const zodiacSigns = [
      { sign: 'aries', start: [3, 21], end: [4, 19] },
      { sign: 'taurus', start: [4, 20], end: [5, 20] },
      { sign: 'gemini', start: [5, 21], end: [6, 20] },
      { sign: 'cancer', start: [6, 21], end: [7, 22] },
      { sign: 'leo', start: [7, 23], end: [8, 22] },
      { sign: 'virgo', start: [8, 23], end: [9, 22] },
      { sign: 'libra', start: [9, 23], end: [10, 22] },
      { sign: 'scorpio', start: [10, 23], end: [11, 21] },
      { sign: 'sagittarius', start: [11, 22], end: [12, 21] },
      { sign: 'capricorn', start: [12, 22], end: [1, 19] },
      { sign: 'aquarius', start: [1, 20], end: [2, 18] },
      { sign: 'pisces', start: [2, 19], end: [3, 20] },
    ];
  
    return (
      zodiacSigns.find(
        ({ start, end }) =>
          (month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1]),
      )?.sign || 'Unknown'
    );
  }

  // Register a new user and convert to DTO
  async newUser(userDto: UserDto): Promise<UserDto> {
    const usernameExists = await this.usernameAlreadyExists(userDto.username);
    if (usernameExists) {
      throw new Error('Username already exists');
    }

    // Compute zodiac sign based on birth date
    userDto.zodiacSign = this.computeZodiacSign(new Date(userDto.birthDate));

    const newUser = await this.usersRepository.newUser(userDto);
    return this.userMapper.entityToDto(newUser);
  }

  // Update an existing user and convert to DTO
  async updateUser(userId: string, userDto: UserDto, authenticatedId: string): Promise<UserDto> {
    // Validate ownership
    if (userId !== authenticatedId) {
      throw new Error('You are not authorized to update this user');
    }
    
    const currentUser = await this.usersRepository.getUserById(userId);
    userDto.zodiacSign = this.computeZodiacSign(new Date(userDto.birthDate));
    
    // Update password only if it's different
    if (!userDto.password || await bcrypt.compare(userDto.password, currentUser.password)) {
      userDto.password = currentUser.password;
    }

    const updatedUser = await this.usersRepository.updateUser(userId, userDto);
    return this.userMapper.entityToDto(updatedUser);
  }  

  // Delete a user
  async deleteUser(userId: string, authenticatedId: string): Promise<void> {
    if (userId !== authenticatedId) {
      throw new Error('You are not authorized to delete this user');
    }
    await this.usersRepository.deleteUser(userId);
  }

  // Retrieve all posts by a specific user
  async getPostsByUser(userId: string): Promise<PostEntity[]> {
    return await this.usersRepository.getPostsByUser(userId);
  }
}
