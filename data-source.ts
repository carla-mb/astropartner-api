import { DataSource } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,  
  port: Number(process.env.DB_PORT), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,  
  logging: process.env.NODE_ENV === 'development',
  entities: [UserEntity], 
  migrations: ['./dist/migrations/*.js'],
});
