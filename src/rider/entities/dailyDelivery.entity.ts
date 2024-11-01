import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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