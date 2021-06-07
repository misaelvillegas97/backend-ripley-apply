// tslint:disable:variable-name
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm'
import config from '~/config'
import { RecipientBank } from './recipientBank'

@Entity(`${config.DB.MAIN_SCHEMA}.bank`)
export class Bank extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column('varchar')
  public name: string

  @OneToMany(type => RecipientBank, rBank => rBank.id_bank)
  accounts: RecipientBank []

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Timestamp

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
