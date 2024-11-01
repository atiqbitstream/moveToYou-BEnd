import { AssignCustomer } from "src/rider/entities/assignCustomer.entity";
import { DailyDelivery } from "src/rider/entities/dailyDelivery.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

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
    googlePin:string;

    @Column()
    homePicture:string;

    @Column()
    organization:string;

    @Column()
    status:boolean;

    @Column()
    contract:string;

    @OneToMany(()=>DailyDelivery, (dailyDelivery)=>dailyDelivery.customer)
      dailyDeliveries:DailyDelivery[];

      @ManyToMany(()=>AssignCustomer,(assignCustomer)=>assignCustomer.customer)
      assignments:AssignCustomer[]
    
}
