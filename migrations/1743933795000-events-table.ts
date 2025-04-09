import { MigrationInterface, QueryRunner } from 'typeorm';

export class eventsTable1743933795000 implements MigrationInterface {
  name = 'eventsTable1743933795000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the 'events' table
    await queryRunner.query(`
      CREATE TABLE "events" (
        "eventId" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "title" character varying(255) NOT NULL,
        "start" TIMESTAMP NOT NULL,
        "end" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_events_eventId" PRIMARY KEY ("eventId"),
        CONSTRAINT "FK_events_userId" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE
      );
    `);    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback: Drop the 'events' table
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
