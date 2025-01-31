import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";


@Entity()
export class Invoice
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'date'})
    date:Date;

    //This is the payment user made, which reduces his/her balance.
    @Column()
    credit:number;

    // amount user has to pay you

    @Column()
    debit:number;

    @Column()
    status:InvoiceStatus;

    @Column()
    fpath:string;

    @ManyToOne(()=>Customer,(customer)=>customer)
    customer:Customer;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP', nullable:true})
    createdAt:Date;

    @Column({type:'timestamp', default:()=>'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP', nullable:true})
    updatedAt:Date;

    


}