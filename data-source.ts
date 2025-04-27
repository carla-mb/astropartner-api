import { DataSource } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/post.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { EventEntity } from 'src/events/event.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,  
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,  
  logging: process.env.NODE_ENV === 'development',
  entities: [UserEntity, PostEntity, CommentEntity, EventEntity], 
  migrations: ['./dist/migrations/*.js'],
});
