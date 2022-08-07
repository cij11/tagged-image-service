import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateImagesTagsTagTable1659860818521
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE image_tags_tag (
                    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    imageId int NOT NULL,
                    tagId int NOT NULL,
                    CONSTRAINT FOREIGN KEY (imageId) REFERENCES image(id),
                    CONSTRAINT FOREIGN KEY (tagId) REFERENCES tag(id)
                );`
        )
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE image_tags_tag')
    }
}
