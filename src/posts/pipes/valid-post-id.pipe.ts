import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Injectable()
// Check if a post exists given an ID
export class ValidPostIdPipe implements PipeTransform {
  constructor(private postsService: PostsService) {}
  async transform(value: any) {
    try {
      await this.postsService.getPostById(value);
    } catch (err) {
      throw new BadRequestException("Post ID doesn't exist");
    }
    return value;
  }
}
