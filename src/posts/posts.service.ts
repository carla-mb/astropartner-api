import { Injectable } from '@nestjs/common';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';
import { PostMapper } from './post.mapper';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private postMapper: PostMapper,
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
}
