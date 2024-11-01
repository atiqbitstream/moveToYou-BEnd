import { Column, PrimaryGeneratedColumn } from "typeorm";

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

   



}