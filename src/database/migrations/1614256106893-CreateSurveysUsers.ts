import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614256106893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "surveys_users",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                }, {
                    name: 'user_id',
                    type: 'uuid'
                }, {
                    name: 'survey_id',
                    type: 'uuid'
                }, {
                    name: 'value',
                    type: 'number',
                    isNullable: true
                }, {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'surveys_users',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }, {
                    name: 'surveys_users',
                    columnNames: ['survey_id'],
                    referencedTableName: 'surveys',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users')
    }

}
