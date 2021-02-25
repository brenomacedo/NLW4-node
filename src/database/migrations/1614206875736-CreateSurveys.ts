import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614206875736 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'surveys',
            columns: [
                {
                    name: 'id',
                    isPrimary: true,
                    type: 'uuid'
                }, {
                    name: 'title',
                    type: 'varchar'
                }, {
                    name: 'description',
                    type: 'varchar'
                }, {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys')
    }

}
