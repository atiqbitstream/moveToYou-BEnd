import { Column, PrimaryGeneratedColumn } from "typeorm";

export class dailyDelivery
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date:Date

    @Column()
    cancelled:boolean;

    @Column()
    cancelledReason:string;
}