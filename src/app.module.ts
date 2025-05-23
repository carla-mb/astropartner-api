import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { EventsModule } from './events/events.module';
import { MoonModule } from './moon/moon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,       
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 5432, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['./dist/**/*.entity.js'],  
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    UsersModule, 
    AuthModule, HoroscopeModule, PostsModule, CommentsModule, EventsModule, MoonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
