import { MigrationInterface, QueryRunner } from 'typeorm';

export class postsTable1743448471000 implements MigrationInterface {
  name = 'postsTable1743448471000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'posts' table
    await queryRunner.query(`
      CREATE TABLE "posts" (
        "postId" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "postTitle" character varying(100) NOT NULL,
        "postContent" text NOT NULL,
        "postDate" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_posts_postId" PRIMARY KEY ("postId"),
        CONSTRAINT "FK_posts_userId" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE
      )
    `);    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: Drop the 'posts' table
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
