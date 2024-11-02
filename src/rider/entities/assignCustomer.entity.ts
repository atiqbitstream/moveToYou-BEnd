import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rider } from "./rider.entity";
import { Customer } from "src/customer/entities/customer.entity";

@Entity()
export class AssignCustomer
{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Rider,(rider)=>rider.assignments)
    rider:Rider;

    @ManyToOne(()=>Customer,(customer)=>customer.assignments)
    customer:Customer;

    @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;
}