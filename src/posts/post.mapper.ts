import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { PostDto } from './post.dto';

@Injectable()
export class PostMapper {
  // Convert a PostEntity to a PostDto
  entityToDto(postEntity: PostEntity): PostDto {
    return {
      postId: postEntity.postId,
      userId: postEntity.userId,
      postTitle: postEntity.postTitle,
      postContent: postEntity.postContent,
      postDate: postEntity.postDate,
    };
  }

  // Convert a PostDto to a PostEntity
  dtoToEntity(postDto: PostDto): PostEntity {
    const post = new PostEntity();
    post.userId = postDto.userId!;
    post.postTitle = postDto.postTitle;
    post.postContent = postDto.postContent;
    
    if (postDto.postDate) {
      post.postDate = new Date(postDto.postDate);
    }

    return post;
  }
}
