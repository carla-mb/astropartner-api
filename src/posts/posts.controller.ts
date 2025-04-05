import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { PostDto } from './post.dto';
import { CommentDto } from 'src/comments/comment.dto';
import { ValidPostIdPipe } from './pipes/valid-post-id.pipe';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // Get all posts
  @Get()
  async getAllPosts(): Promise<PostDto[]> {
    return await this.postsService.getAllPosts();
  }

  // Get post by ID (requires authentication)
  @Get(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getPostById(
    @Param('id', ValidPostIdPipe) postId: string
  ): Promise<PostDto> {
    return await this.postsService.getPostById(postId);
  }

  // Create new post (requires authentication)
  @Post()
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async newPost(
    @Body() postDto: PostDto,
    @GetUser('userId') userId: string,
  ): Promise<PostDto> {
    postDto.userId = userId;
    return await this.postsService.newPost(postDto);
  }

  // Update post by ID (requires authentication)
  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async updatePost(
    @Param('id', ValidPostIdPipe) postId: string,
    @Body() postDto: PostDto,
    @GetUser('userId') userId: string
  ): Promise<PostDto> {
    postDto.userId = userId;
    return await this.postsService.updatePost(postId, postDto, userId);
  }

  // Delete post by ID (requires authentication)
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deletePost(
    @Param('id', ValidPostIdPipe) postId: string,
    @GetUser('userId') userId: string
  ): Promise<void> {
    return await this.postsService.deletePost(postId, userId);
  }

  // Retrieve all comments for a specific post
  @Get(':id/comments')
  async getCommentsByPostId(@Param('id', ValidPostIdPipe) postId: string) {
    return this.postsService.getCommentsByPostId(postId);
  }

  // Create a new comment for a specific post (requires authentication)
  @Post(':postId/comments')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async addCommentToPost(
    @Param('postId', ValidPostIdPipe) postId: string,
    @Body() commentDto: CommentDto,
    @GetUser('userId') userId: string,
  ): Promise<CommentDto> {
    // Pass the comment data to the CommentsService via PostsService
    return await this.postsService.addCommentToPost(postId, userId, commentDto);
  }
}
