import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTagTable1659495635906 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE tag (
                    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    text varchar(255)
                );`
        )
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE tag')
    }
}
