import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PostEntity } from 'src/posts/post.entity';

// CommentEntity represents a post in the database
@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  postId: string;

  @Column({ type: 'text' })
  commentContent: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  commentDate: Date;

  // Relation: each comment is tied to one post
  // If post is deleted, associated comments are removed
  @ManyToOne(() => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  // Relation: each comment is tied to one user
  // If user is deleted, associated comments are removed
  @ManyToOne(() => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}