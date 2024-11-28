import { Area } from 'src/rider/entities/area.entity';
import { AssignCustomer } from 'src/rider/entities/assignCustomer.entity';
import { DailyDelivery } from 'src/rider/entities/dailyDelivery.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
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
  googlePin: string;

  @Column()
  homePicture: string;

  @Column()
  organization: string;

  @Column()
  organizationId:number;

  @Column()
  status: boolean;

  @Column()
  contract: string;

  @OneToMany(() => DailyDelivery, (dailyDelivery) => dailyDelivery.customer)
  dailyDeliveries: DailyDelivery[];

  @OneToMany(() => AssignCustomer, (assignCustomer) => assignCustomer.customer, {cascade:true})
  assignments: AssignCustomer[];

  @ManyToOne(()=>Area,(area)=>area.customers)
  area:Area;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', default:()=>'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP', nullable:true})
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;
}
