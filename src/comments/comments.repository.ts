import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
  ) {}

  // Retrieve all comments by a user
  async getCommentsByUser(userId: string): Promise<CommentEntity[]> {
    return this.commentsRepository.find({ where: { userId } });
  }

  // Retrieve all comments of a post by its ID
  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    return this.commentsRepository.find({ where: { postId } });
  }

  // Find a comment by ID
  async getCommentById(commentId: string): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOne({ where: { commentId } });
    if (!comment) {
      throw new Error('Comment not found');
    }
    return comment;
  }

  // Create a new comment
  async newComment(commentDto: CommentDto): Promise<CommentEntity> {
    const comment = this.commentsRepository.create(commentDto);
    return this.commentsRepository.save(comment);
  }

  // Update a comment
  async updateComment(commentId: string, commentDto: CommentDto): Promise<CommentEntity> {
    await this.commentsRepository.update(commentId, commentDto);
    return this.getCommentById(commentId);
  }

  // Delete a comment
  async deleteComment(commentId: string): Promise<void> {
    await this.commentsRepository.delete(commentId);
  }
}
