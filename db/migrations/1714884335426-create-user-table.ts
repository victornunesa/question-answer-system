import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1714884335426 implements MigrationInterface {
    name = 'CreateUserTable1714884335426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ORGANIZADOR', 'PARTICIPANTE')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(40) NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
