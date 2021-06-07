import { Transfer } from '~/packages/database/models/transfer'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import config from '~/config'
import { Bank } from './bank'
import { Recipient } from './recipient'

@Entity(`${config.DB.MAIN_SCHEMA}.recipient_bank`)
export class RecipientBank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  @ManyToOne(() => Recipient, (recipient) => recipient.recipient_bank)
  @JoinColumn({ name: 'id_recipient' })
  public id_recipient: Recipient

  // @ManyToOne(() => Recipient, recipient => recipient.recipient_bank)
  // recipient: Recipient

  @Column('uuid')
  @ManyToOne(() => Bank, (bank) => bank.id)
  @JoinColumn({ name: 'id_bank' })
  public id_bank: Bank

  // @ManyToOne(() => Bank, bank => bank.id)
  // public bank: Bank

  @OneToMany(() => Transfer, (transfer) => transfer.id_user)
  @JoinColumn()
  public transfers: Transfer[]

  @Column()
  public account_type: string

  @Column()
  public account_number: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Timestamp

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Timestamp
}
