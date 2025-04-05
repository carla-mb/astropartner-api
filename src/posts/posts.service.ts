import { Injectable } from '@nestjs/common';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';
import { PostMapper } from './post.mapper';
import { PostsRepository } from './posts.repository';
import { CommentDto } from 'src/comments/comment.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CommentEntity } from 'src/comments/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private postMapper: PostMapper,
    private readonly commentsService: CommentsService,
  ) {}

  // Retrieve all posts and convert to DTOs
  async getAllPosts(): Promise<PostDto[]> {
    const posts: PostEntity[] = await this.postsRepository.getAllPosts();
    return posts.map(post => this.postMapper.entityToDto(post));
  }

  // Retrieve a post by ID and convert to DTO
  async getPostById(postId: string): Promise<PostDto> {
    const post: PostEntity = await this.postsRepository.getPostById(postId);
    return this.postMapper.entityToDto(post);
  }

  // Create a new post and convert to DTO
  async newPost(postDto: PostDto): Promise<PostDto> {
    const newPost = await this.postsRepository.newPost(postDto);
    return this.postMapper.entityToDto(newPost);
  }
  
  // Update a post and convert to DTO
  async updatePost(postId: string, postDto: PostDto, userId: string): Promise<PostDto> {
    const post = await this.postsRepository.getPostById(postId);

    if (post.userId !== userId) {
      throw new Error('You are not authorized to update this post');
    }

    const updatedPost = await this.postsRepository.updatePost(postId, postDto);
    return this.postMapper.entityToDto(updatedPost);
  }
  
  // Delete a post
  async deletePost(postId: string, userId: string): Promise<void> {
    const post = await this.postsRepository.getPostById(postId);
  
    if (post.userId !== userId) {
      throw new Error('You are not authorized to delete this post');
    }
  
    await this.postsRepository.deletePost(postId);
  }

  // Retrieve all comments for a specific post
  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return await this.postsRepository.getCommentsByPostId(postId);
  }

  // Create a new comment for a specific post
  async addCommentToPost(postId: string, userId: string, commentDto: CommentDto): Promise<CommentDto> {
    // Associate the user ID and post ID with the comment
    commentDto.postId = postId;
    commentDto.userId = userId;

    // Delegate to CommentsService
    return await this.commentsService.newComment(commentDto);
  }
}
