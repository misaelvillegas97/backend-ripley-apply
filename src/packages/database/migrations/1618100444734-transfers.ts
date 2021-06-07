import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import config from '~/config'
import { withTimestampsMigration } from '../helpers/withTimestampsMigration'

const tableName = `${config.DB.MAIN_SCHEMA}.transfers`

export class transfers1618100444734 implements MigrationInterface {
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
              comment: 'Id de transferencia',
            },
            {
              isNullable: false,
              name: 'id_user',
              type: 'uuid',
              comment: 'Id de usuario que realiza la transferencia',
            },
            {
              isNullable: false,
              name: 'id_account',
              type: 'uuid',
              comment: 'Id de cuenta de la persona a transferir',
            },
            {
              isNullable: false,
              name: 'amount',
              type: 'int',
              comment: 'Monto transferido',
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
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['id_account'],
        referencedTableName: 'recipient_bank',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
