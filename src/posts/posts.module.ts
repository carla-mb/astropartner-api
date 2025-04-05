import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostMapper } from './post.mapper';
import { PostEntity } from './post.entity';
import { PostsRepository } from './posts.repository';
import { CommentsModule } from 'src/comments/comments.module';
import { CommentEntity } from 'src/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity]),
  CommentsModule
],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostMapper,
    PostsRepository
  ],
  exports: [PostsModule]
})
export class PostsModule {}
