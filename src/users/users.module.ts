import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { PostsModule } from 'src/posts/posts.module';
import { PostEntity } from 'src/posts/post.entity';
import { EventEntity } from 'src/events/event.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, EventEntity]),
  PostsModule,
  EventsModule
  ],
  providers: [
    UsersService,
    UsersRepository,
    UserMapper
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
