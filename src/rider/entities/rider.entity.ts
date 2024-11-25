import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssignCustomer } from './assignCustomer.entity';
import { DailyDelivery } from './dailyDelivery.entity';

@Entity()
export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId:number; //Referecne to user in SNB




  @OneToMany(() => AssignCustomer, (assignCustomer) => assignCustomer.rider,{cascade:true})
  assignments: AssignCustomer[];

  @OneToMany(() => DailyDelivery, (dailyDelivery) => dailyDelivery.rider)
  dailyDeliveries: DailyDelivery[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;
}
