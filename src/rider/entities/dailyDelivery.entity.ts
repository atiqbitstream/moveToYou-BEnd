import { Customer } from './../../customer/entities/customer.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rider } from './rider.entity';
import { DeliveryItem } from './deliveryItem.entity';

@Entity()
export class DailyDelivery
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'timestamp', nullable: false })
    date:Date

    @Column({default:false})
    cancelled:boolean;

    @Column({default:"no reason "})
    cancelledReason:string;

    @Column({ nullable: true })
    customerId:number;

    @Column({ nullable: true })
    userId:number;     //Reference to user in secureNotify

    @ManyToOne(()=>Customer,(customer)=>customer.dailyDeliveries)
     customer:Customer;


    @ManyToOne(()=>Rider,(rider)=>rider.dailyDeliveries)
    rider:Rider;

    @OneToMany(()=>DeliveryItem,(deliveryItem)=>deliveryItem.dailyDelivery,{cascade:true})
    deliveryItems:DeliveryItem[];

    @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;
}