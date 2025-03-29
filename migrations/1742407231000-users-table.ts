import { MigrationInterface, QueryRunner } from 'typeorm';

export class usersTable1742407231000 implements MigrationInterface {
  name = 'usersTable1742407231000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'users' table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "userId" uuid NOT NULL DEFAULT uuid_generate_v4(),  
        "username" character varying(50) NOT NULL,         
        "password" character varying(255) NOT NULL,         
        "birthDate" DATE NOT NULL,                     
        "zodiacSign" character varying(15) NOT NULL,        
        CONSTRAINT "PK_users_userId" PRIMARY KEY ("userId"),  
        CONSTRAINT "UQ_users_username" UNIQUE ("username")     
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: Drop the 'users' table
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
