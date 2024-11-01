import { Customer } from './../../customer/entities/customer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;
}