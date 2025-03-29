import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
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
