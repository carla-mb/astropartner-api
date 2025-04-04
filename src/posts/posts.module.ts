import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostMapper } from './post.mapper';
import { PostEntity } from './post.entity';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]),
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
