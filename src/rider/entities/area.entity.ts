import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Zone } from "./zone.entity";
import { Customer } from "src/customer/entities/customer.entity";

@Entity()
export class Area
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    address:string;

    @Column("simple-json")
    googlePins: { latitude: string; longitude: string }

    @Column({ type: 'timestamp'})
    createdAt: Date;
  
    @Column({ type: 'timestamp', default:()=>'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'})
    updatedAt: Date;


    @ManyToOne(()=>Zone,(zone)=>zone.areas)
    zone:Zone;

    @OneToMany(()=>Customer,(customer)=>customer.area)
     customers:Customer[];
}