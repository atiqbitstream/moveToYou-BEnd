
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DailyDelivery } from "./dailyDelivery.entity";

export class DeliveryItem
{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date;

    @Column()
    Qty:number;

    @Column()
    price:number;

   @ManyToOne(()=>DailyDelivery,(dailyDelivery)=>dailyDelivery.DeliveryItems)
    dailyDelivery:DailyDelivery;


}