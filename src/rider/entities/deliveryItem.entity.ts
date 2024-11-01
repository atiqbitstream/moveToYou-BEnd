
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DailyDelivery } from "./dailyDelivery.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
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

    @ManyToOne(()=>Product,(product)=>product.deliveryItems)
    product:Product;

    @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;

}