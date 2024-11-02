import { DeliveryItem } from 'src/rider/entities/deliveryItem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(()=>DeliveryItem,(deliveryItem)=>deliveryItem.product)
   deliveryItems:DeliveryItem[];

   @Column({default:false})
  isDeleted:boolean;

}
