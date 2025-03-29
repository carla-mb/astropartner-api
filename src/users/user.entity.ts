import * as bcrypt from 'bcrypt';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

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
}
