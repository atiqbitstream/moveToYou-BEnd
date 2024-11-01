import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}