import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostDto } from './post.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  // Retrieve all posts
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  // Find a post by ID
  async getPostById(postId: string): Promise<PostEntity> {
    const post = await this.postsRepository.findOne({ where: { postId } });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  // Create a new post
  async newPost(postDto: PostDto): Promise<PostEntity> {
    const post = this.postsRepository.create(postDto);
    return this.postsRepository.save(post);
  }

  // Update a post
  async updatePost(postId: string, postDto: PostDto): Promise<PostEntity> {
    await this.postsRepository.update(postId, postDto);
    return this.getPostById(postId);
  }

  // Delete a post
  async deletePost(postId: string): Promise<void> {
    await this.postsRepository.delete(postId);
  }
}
