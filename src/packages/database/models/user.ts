// tslint:disable:variable-name
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm'
import config from '~/config'
import { Recipient } from './recipient'
import { Transfer } from './transfer'

@Entity(`${config.DB.MAIN_SCHEMA}.users`)
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: string

  @Column('varchar')
  public name: string

  @Column('varchar')
  public rut: string

  @Column('varchar')
  public email: string

  @Column('varchar')
  public phone_number: string

  @OneToMany(() => Recipient, recipient => recipient.id_user)
  @JoinColumn()
  public recipient: Recipient[]

  @OneToMany(() => Transfer, transfer => transfer.id_user)
  @JoinColumn()
  public transfers: Transfer[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Timestamp

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
