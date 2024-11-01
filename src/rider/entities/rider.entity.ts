import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AssignCustomer } from "./assignCustomer.entity";

@Entity()
export class Rider {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber:string;

    @Column()
    address:string;

    @Column()
    sector:string;

    @Column()
    street:string;

    @Column()
    cnicNumber:string;

    @OneToMany(()=>AssignCustomer,(assignCustomer)=>assignCustomer.rider)
    assignments:AssignCustomer[];
}