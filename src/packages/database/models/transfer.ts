import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm'
import config from '~/config'
import { RecipientBank } from './recipientBank'
import { User } from './user'

@Entity(`${config.DB.MAIN_SCHEMA}.transfers`)
export class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  // @ManyToOne(() => User, user => user.id)
  // usuario: User

  @Column('uuid')
  @ManyToOne((type) => User, (user) => user.transfers)
  @JoinColumn({ name: 'id_user' })
  public id_user: User

  @Column('uuid')
  @ManyToOne(() => RecipientBank, (recipientBank) => recipientBank.id)
  @JoinColumn({ name: 'id_account' })
  public id_account: RecipientBank

  // @ManyToOne(() => RecipientBank, recipientBank => recipientBank.id)
  // id_account: RecipientBank

  @Column()
  public amount: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public created_at: Timestamp

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updated_at: Timestamp
}
