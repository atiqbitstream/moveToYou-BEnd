import { Customer } from './../../customer/entities/customer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DeliveryItem } from './deliveryItem.entity';
import { Receipt } from 'src/customer/entities/receipt.entity';

@Entity()
export class DailyDelivery
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'timestamp', nullable: false })
    date:Date

    @Column({default:false})
    cancelled:boolean;

    @Column({default:"no reason "})
    cancelledReason:string;

    @Column({ nullable: true })
    customerId:number;

    @ManyToOne(()=>Customer,(customer)=>customer.dailyDeliveries)
     customer:Customer;


    @Column()
    riderId:number;

    @OneToMany(()=>DeliveryItem,(deliveryItem)=>deliveryItem.dailyDelivery,{cascade:true,eager:true})
    deliveryItems:DeliveryItem[];

    @OneToOne(()=>Receipt,(receipt)=>receipt.dailyDelivery)
    @JoinColumn({ name: "receiptId" })  
    receipt: Receipt;
    

    @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;

  @Column({default:false})
  isTest:boolean;
}