import { Customer } from './../../customer/entities/customer.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rider } from './rider.entity';
import { DeliveryItem } from './deliveryItem.entity';

@Entity()
export class DailyDelivery
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date

    @Column()
    cancelled:boolean;

    @Column()
    cancelledReason:string;

    @ManyToOne(()=>Customer,(customer)=>customer.dailyDeliveries)
     customer:Customer;


    @ManyToOne(()=>Rider,(rider)=>rider.dailyDeliveries)
    rider:Rider;

    @OneToMany(()=>DeliveryItem,(deliveryItem)=>deliveryItem.dailyDelivery)
    DeliveryItems:DeliveryItem[];

    @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}