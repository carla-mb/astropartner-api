import { Controller, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CommentDto } from './comment.dto';
import { ValidCommentIdPipe } from './pipes/valid-comment-id.pipe';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // Update comment by ID (requires authentication)
  @Put(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async updateComment(
    @Param('id', ValidCommentIdPipe) commentId: string,
    @Body() commentDto: CommentDto,
    @GetUser('userId') userId: string,
  ): Promise<CommentDto> {
    commentDto.userId = userId;
    return await this.commentsService.updateComment(commentId, commentDto, userId);
  }

  // Delete comment by ID (requires authentication)
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Param('id', ValidCommentIdPipe) commentId: string,
    @GetUser('userId') userId: string
  ): Promise<void> {
    return await this.commentsService.deleteComment(commentId, userId);
  }
}
