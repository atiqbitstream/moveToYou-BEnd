import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";
import { DailyDelivery } from "src/rider/entities/dailyDelivery.entity";

@Entity()
export class Receipt
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    receiptsItem:number;

    @ManyToOne(()=>Invoice,(invoice)=>invoice.receipts)
    invoice:Invoice;

    @OneToOne(()=>DailyDelivery,(dailydelivery)=>dailydelivery.receipt)
    dailyDelivery:DailyDelivery;

    @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP', nullable:true})
    createdAt:Date;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP',nullable:true})
    updatedAt:Date;

 
}