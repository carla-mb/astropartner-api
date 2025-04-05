import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { CommentsService } from '../comments.service';

@Injectable()
// Check if a comment exists given an ID
export class ValidCommentIdPipe implements PipeTransform {
  constructor(private commentsService: CommentsService) {}
  async transform(value: any) {
    try {
      await this.commentsService.getCommentById(value);
    } catch (err) {
      throw new BadRequestException("Comment ID doesn't exist");
    }
    return value;
  }
}
