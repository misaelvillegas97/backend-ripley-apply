import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import config from '~/config'
import { withTimestampsMigration } from '../helpers/withTimestampsMigration'

const tableName = `${config.DB.MAIN_SCHEMA}.recipient_bank`

export class recipientBank1618099769054 implements MigrationInterface {
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
              comment: 'Id de relación usuario/banco',
            },
            {
              isNullable: false,
              name: 'id_recipient',
              type: 'uuid',
              comment: 'Id de destinatario',
            },
            {
              isNullable: false,
              name: 'id_bank',
              type: 'uuid',
              comment: 'Id de banco',
            },
            {
              isNullable: false,
              name: 'account_type',
              type: 'varchar',
              comment: 'Tipo de cuenta',
            },
            {
              isNullable: false,
              name: 'account_number',
              type: 'varchar',
              comment: 'Número de cuenta',
            },
          ],
          name: tableName,
        }),
      ),
    )

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['id_recipient'],
        referencedTableName: 'recipients',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      tableName,
      new TableForeignKey({
        columnNames: ['id_bank'],
        referencedTableName: 'bank',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )
    //await queryRunner.query(`select app_audit.audit_table('${tableName}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
