import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import config from '~/config'
import { withTimestampsMigration } from '../helpers/withTimestampsMigration'

const tableName = `${config.DB.MAIN_SCHEMA}.recipients`

export class recipients1618095664650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        withTimestampsMigration({
          columns: [
            {
              generationStrategy: 'uuid',
              isGenerated: true,
              isPrimary: true,
              name: 'id',
              type: 'uuid',
            },
            {
              isNullable: false,
              name: 'id_user',
              type: 'uuid',
            },
            {
              isNullable: false,
              name: 'name',
              type: 'varchar',
              comment: 'Nombre de usuario a transferir',
            },
            {
              isNullable: false,
              name: 'rut',
              isUnique: true,
              type: 'varchar',
              comment: 'Rol Único Tributario de usuario a transferir',
            },
            {
              isNullable: false,
              name: 'email',
              type: 'varchar',
              comment: 'Correo de usuario a transferir',
            },
            {
              name: 'phone_number',
              type: 'varchar',
              comment: 'Número telefónico de usuario a transferir',
            },
          ],
          name: tableName,
        }),
      ),
    )

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
