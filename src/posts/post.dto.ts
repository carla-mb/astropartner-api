import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({ required: false })
  postId?: string;

  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  postTitle: string;

  @ApiProperty()
  postContent: string;

  @ApiProperty({ required: false })
  postDate?: Date;
}

