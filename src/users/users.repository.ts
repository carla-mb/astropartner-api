import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { PostEntity } from 'src/posts/post.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  // Check if username already exists
  async usernameAlreadyExists(username: string): Promise<number> {
    return this.usersRepository.count({ where: { username } });
  }

  // Retrieve all users
  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  // Find a user by ID
  async getUserById(userId: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Find a user by username
  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Create a new user
  async newUser(userDto: UserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  // Update a user
  async updateUser(userId: string, userDto: UserDto): Promise<UserEntity> {
    await this.usersRepository.update(userId, userDto);
    return this.getUserById(userId);
  }

  // Delete a user by ID
  async deleteUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  // Retrieve all posts by a specific user
  async getPostsByUser(userId: string): Promise<PostEntity[]> {
    return await this.postsRepository.find({ 
      where: { userId } 
    });
  }
}
