import { Customer } from 'src/customer/entities/customer.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Route{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    riderId:number;

    @Column()
    customerId:number;

    @Column()
    index:number;

    @OneToOne(()=>Customer,(customer)=>customer.route)
    @JoinColumn({ name: 'customerId' }) // This links `customerId` in `Route` to the `Customer`
    customer:Customer
}