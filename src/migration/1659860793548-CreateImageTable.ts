import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateImageTable1659860793548 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE image (
                    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    filename varchar(255),
                    createdAt DATETIME,
                    modifiedAt DATETIME
                );`
        )
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE image')
    }
}
