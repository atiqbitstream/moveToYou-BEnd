import { Customer } from './../../customer/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rider } from './rider.entity';

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
}