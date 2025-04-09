import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { ValidUserIdPipe } from './pipes/valid-user-id.pipe';
import { ExistUserUsernamePipe } from './pipes/exist-user-username.pipe';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  // Get all users (requires authentication)
  @Get()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  // Get user by ID (requires authentication)
  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id', ValidUserIdPipe) userId: string): Promise<UserDto> {
    return this.usersService.getUserById(userId);
  }

  // Create a new user and validate that username doesn't already exist
  @Post()
  @UsePipes(ExistUserUsernamePipe)
  async newUser(@Body() user: UserDto): Promise<UserDto> {
    return this.usersService.newUser(user);
  }

  // Update user by ID (requires authentication and username validation)
  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ExistUserUsernamePipe)
  async updateUser(
    @Param('id', ValidUserIdPipe) userId: string, 
    @Body() user: UserDto,
    @GetUser('userId') authenticatedId: string, 
  ): Promise<UserDto> {
    return this.usersService.updateUser(userId, user, authenticatedId);
  }

  // Delete user by ID (requires authentication)
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id', ValidUserIdPipe) userId: string,
    @GetUser('userId') authenticatedId: string, 
  ): Promise<void> {
    return this.usersService.deleteUser(userId, authenticatedId);
  }

  // Get all posts by a user
  @Get(':id/posts')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  getPostsByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getPostsByUser(userId);
  }

  // Get all events by a user
  @Get(':id/events')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  getEventsByUser(@Param('id', ValidUserIdPipe) userId: string) {
    return this.usersService.getEventsByUser(userId);
  }
}
