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
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  sector: string;

  @Column()
  street: string;

  @Column()
  cnicNumber: string;

  @OneToMany(() => AssignCustomer, (assignCustomer) => assignCustomer.rider)
  assignments: AssignCustomer[];

  @OneToMany(() => DailyDelivery, (dailyDelivery) => dailyDelivery.rider)
  dailyDeliveries: DailyDelivery[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
