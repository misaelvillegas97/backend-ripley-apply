import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import config from '~/config'
import { withTimestampsMigration } from '~/packages/database/helpers/withTimestampsMigration'

const tableName = `${config.DB.MAIN_SCHEMA}.users`

export class AddUsersTable1582820170145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
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
              comment: 'Id de usuario',
            },
            {
              isNullable: false,
              name: 'name',
              type: 'varchar',
              comment: 'Nombre de usuario',
            },
            {
              isNullable: false,
              name: 'rut',
              isUnique: true,
              type: 'varchar',
              comment: 'Rol Único Tributario',
            },
            {
              isNullable: false,
              name: 'email',
              type: 'varchar',
              comment: 'Correo de usuario',
            },
            {
              name: 'phone_number',
              type: 'varchar',
              comment: 'Número telefónico de usuario',
            },
          ],
          name: tableName,
        }),
      ),
    )
    await queryRunner.query(`
      INSERT INTO users (id, "name", rut, email, phone_number)
      VALUES(uuid_generate_v4(), 'Administrador', '1-9', 'correo@correo.cl', '+569133');
    `)
    await queryRunner.query(`select app_audit.audit_table('${tableName}')`)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(`${tableName}`)
  }
}
