import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber:number;

    @Column()
    Address:string;

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
}
