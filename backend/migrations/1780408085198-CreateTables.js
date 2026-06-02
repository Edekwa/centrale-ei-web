/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class CreateTables1780408085198 {
    name = 'CreateTables1780408085198'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "release_date" varchar NOT NULL,
                "original_language" varchar NOT NULL,
                "overview" varchar NOT NULL,
                "vote_average" integer NOT NULL,
                "poster_path" varchar NOT NULL,
                "genre_id" text NOT NULL,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
            )
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }
}
