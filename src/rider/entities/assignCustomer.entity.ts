import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "src/customer/entities/customer.entity";

@Entity()
export class AssignCustomer
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    riderId:number;

    @ManyToOne(()=>Customer,(customer)=>customer.assignments, {onDelete:'CASCADE',eager:true})
    customer:Customer;

    @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({default:false})
  isDeleted:boolean;
}