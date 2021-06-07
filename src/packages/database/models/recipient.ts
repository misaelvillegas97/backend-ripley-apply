import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import config from '~/config'
import { RecipientBank } from './recipientBank'
import { User } from './user'

@Entity(`${config.DB.MAIN_SCHEMA}.recipients`)
export class Recipient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column('uuid')
  @ManyToOne((type) => User, (user) => user.recipient)
  @JoinColumn({ name: 'id_user' })
  public id_user: User

  // @ManyToOne(type => User, (user) => user.recipient)
  // public usuario: User

  @Column('varchar')
  public name: string

  @Column('varchar')
  public rut: string

  @Column('varchar')
  public email: string

  @Column('varchar')
  public phone_number: string

  @OneToMany((type) => RecipientBank, (recipientBank) => recipientBank.id_recipient, { cascade: ['insert', 'update'] })
  @JoinColumn()
  public recipient_bank: RecipientBank[]

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Timestamp

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Timestamp

  @Column('timestamp with time zone')
  public deleted_at: Timestamp
}
