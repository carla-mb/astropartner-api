import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { PostDto } from './post.dto';
import { CommentEntity } from 'src/comments/comment.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>
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

  // Retrieve all comments for a specific post
  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return await this.commentsRepository.find({
      where: { postId }
    });
  }

  // Create a new comment for a specific post
  async addCommentToPost(comment: CommentEntity): Promise<CommentEntity> {
    return await this.commentsRepository.save(comment);
  }
}
