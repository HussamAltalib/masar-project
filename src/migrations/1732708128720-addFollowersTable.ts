import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFollowersTable1732708128720 implements MigrationInterface {
    name = 'AddFollowersTable1732708128720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "followers" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followedId" integer NOT NULL, CONSTRAINT "PK_c90cfc5b18edd29bd15ba95c1a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "followers"`);
    }

}
