import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DailyDelivery } from './dailyDelivery.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class DeliveryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column()
  Qty: number;

  @Column()
  price: number;

  @Column()
  productId: number;

  @ManyToOne(
    () => DailyDelivery,
    (dailyDelivery) => dailyDelivery.DeliveryItems,
  )
  dailyDelivery: DailyDelivery;

  @ManyToOne(() => Product, (product) => product.deliveryItems)
  product: Product;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Automatically updates the timestamp when the entity is updated
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
