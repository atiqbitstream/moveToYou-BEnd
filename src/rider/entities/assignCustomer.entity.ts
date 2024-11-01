import { Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Rider } from "./rider.entity";
import { Customer } from "src/customer/entities/customer.entity";

export class AssignCustomer
{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Rider,(rider)=>rider.assignments)
    rider:Rider;

    @ManyToOne(()=>Customer,(customer)=>customer.assignments)
    customer:Customer;

    @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;
}