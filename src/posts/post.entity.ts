import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CommentEntity } from 'src/comments/comment.entity';

// PostEntity represents a post in the database
@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Column({ type: 'uuid' })
  userId: string; 

  @Column({ type: 'varchar', length: 100 })
  postTitle: string;

  @Column({ type: 'text' })
  postContent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postDate: Date;

  // Relation: each post is tied to one user
  // If user is deleted, associated posts are removed
  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  // Relation: a post can have multiple comments
  @OneToMany(() => CommentEntity, comment => comment.post)
  comments: CommentEntity[];
}