import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentMapper {
  // Convert a CommentEntity to a CommentDto
  entityToDto(comment: CommentEntity): CommentDto {
    return {
      commentId: comment.commentId,
      userId: comment.userId,
      postId: comment.postId,
      commentContent: comment.commentContent,
      commentDate: comment.commentDate,
    };
  }

  // Convert a CommentDto to a CommentEntity
  dtoToEntity(commentDto: CommentDto): CommentEntity {
    const comment = new CommentEntity();
    comment.userId = commentDto.userId!;
    comment.postId = commentDto.postId;
    comment.commentContent = commentDto.commentContent;
    
    if (commentDto.commentDate) {
      comment.commentDate = new Date(commentDto.commentDate);
    }

    return comment;
  }
}
