import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class Receipt
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    receiptsItem:number;

    @ManyToOne(()=>Invoice,(invoice)=>invoice.receipts)
    invoice:Invoice;

    @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP', nullable:true})
    createdAt:Date;

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP',nullable:true})
    updatedAt:Date;

 
}