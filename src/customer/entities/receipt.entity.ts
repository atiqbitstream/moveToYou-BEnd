import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";
import { DailyDelivery } from "src/rider/entities/dailyDelivery.entity";

@Entity()
export class Receipt
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text', {array:true})
    receiptsItem:string[];

    @ManyToOne(()=>Invoice,(invoice)=>invoice.receipts)
    invoice:Invoice;

    @OneToOne(()=>DailyDelivery,(dailydelivery)=>dailydelivery.receipt)
    @JoinColumn() // Ensures foreign key is stored in Receipt table
    dailyDelivery:DailyDelivery;

    @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP', nullable:true})
    createdAt:Date;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP',nullable:true})
    updatedAt:Date;

 
}