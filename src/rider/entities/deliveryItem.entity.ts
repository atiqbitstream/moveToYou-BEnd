import { Column, PrimaryGeneratedColumn } from "typeorm";

export class deliveryItem
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