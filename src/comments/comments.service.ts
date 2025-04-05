import { Injectable } from '@nestjs/common';
import { CommentDto } from './comment.dto';
import { CommentEntity } from './comment.entity';
import { CommentMapper } from './comment.mapper';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private commentMapper: CommentMapper,
  ) {}

  // Retrieve all comments by a user and convert to DTOs
  async getCommentsByUser(userId: string): Promise<CommentDto[]> {
    const comments = await this.commentsRepository.getCommentsByUser(userId);
    return comments.map(comment => this.commentMapper.entityToDto(comment));
  }
  
  // Retrieve all comments of a post by its ID
  async getCommentsByPostId(postId: string): Promise<CommentDto[]> {
    const comments = await this.commentsRepository.getCommentsByPostId(postId);
    return comments.map(comment => this.commentMapper.entityToDto(comment));
  }

  // Retrieve a comment by ID and convert to DTO
  async getCommentById(commentId: string): Promise<CommentDto> {
    const comment: CommentEntity = await this.commentsRepository.getCommentById(commentId);
    return this.commentMapper.entityToDto(comment);
  }

  // Create a new comment and convert to DTO
  async newComment(commentDto: CommentDto): Promise<CommentDto> {
    const newComment = await this.commentsRepository.newComment(commentDto);
    return this.commentMapper.entityToDto(newComment);
  }

  // Update a comment and convert to DTO
  async updateComment(commentId: string, commentDto: CommentDto, userId: string): Promise<CommentDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    
    if (comment.userId !== userId) {
      throw new Error('You are not authorized to update this comment');
    }

    const updatedComment = await this.commentsRepository.updateComment(commentId, commentDto);
    return this.commentMapper.entityToDto(updatedComment);
  }

  // Delete a comment
  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    

    if (comment.userId !== userId) {
      throw new Error('You are not authorized to delete this comment');
    }

    await this.commentsRepository.deleteComment(commentId);
  }
}
