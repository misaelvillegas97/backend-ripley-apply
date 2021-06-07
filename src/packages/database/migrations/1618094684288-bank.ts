import axios from 'axios'
import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import config from '~/config'
import { withTimestampsMigration } from '../helpers/withTimestampsMigration'

const tableName = `${config.DB.MAIN_SCHEMA}.bank`

export class bank1618094684288 implements MigrationInterface {
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
              comment: 'Id de banco',
            },
            {
              isNullable: false,
              name: 'name',
              type: 'varchar',
              isUnique: true,
              comment: 'Nombre de banco',
            },
          ],
          name: tableName,
        }),
      ),
    )

    await axios
      .get(config.BANK_LIST_URL)
      .then((response) => {
        const data = response.data.banks as Array<any>
        data.map((bank) => {
          queryRunner.query(`
              INSERT INTO bank (name) VALUES ('${bank.name}')
              ON CONFLICT (name)
              DO NOTHING
            `)
          return bank
        })
      })
      .catch()

    await queryRunner.query(`select app_audit.audit_table('${tableName}')`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
