import { MigrationInterface, QueryRunner } from 'typeorm';

export class commentsTable1743702511000 implements MigrationInterface {
  name = 'commentsTable1743702511000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'comments' table
    await queryRunner.query(`
      CREATE TABLE "comments" (
        "commentId" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "postId" uuid NOT NULL,
        "commentContent" text NOT NULL,
        "commentDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PK_comments_commentId" PRIMARY KEY ("commentId"),
        CONSTRAINT "FK_comments_postId" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE,
        CONSTRAINT "FK_comments_userId" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE
      );
    `);    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: Drop the 'comments' table
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
