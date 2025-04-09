import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { PostEntity } from 'src/posts/post.entity';
import { CommentEntity } from 'src/comments/comment.entity';
import { EventEntity } from 'src/events/event.entity';

// UserEntity represents a user in the database
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date' })
  birthDate: Date; 

  @Column({ type: 'varchar', length: 15 })
  zodiacSign: string;

  // Hash password before inserting a new user into the database
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Hash password before updating an existing user
  @BeforeUpdate()
  async hashPasswordUpdate() {
    if (this.password && !this.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Compare user's password with stored hashed password
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Relation: a user can have multiple posts
  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  // Relation: a user can have multiple comments
  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[];

  // Relation: a user can have multiple events
  @OneToMany(() => EventEntity, event => event.user)
  events: EventEntity[];
}
