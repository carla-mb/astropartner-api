import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ required: false })
  commentId?: string;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  commentContent: string;

  @ApiProperty({ required: false })
  commentDate?: Date;
}
