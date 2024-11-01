import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AssignCustomer } from "./assignCustomer.entity";
import { DailyDelivery } from "./dailyDelivery.entity";

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

    @OneToMany(()=>DailyDelivery,(dailyDelivery)=>dailyDelivery.rider)
     dailyDeliveries:DailyDelivery[];

     @Column()
    createdAt:Date;

    @Column()
    updatedAt:Date;
}