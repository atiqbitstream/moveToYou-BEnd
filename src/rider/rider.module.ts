import { Customer } from 'src/customer/entities/customer.entity';
import { Module } from '@nestjs/common';
import { RiderService } from './services/rider.service';
import { RiderController } from './controllers/rider.controller';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyDelivery } from './entities/dailyDelivery.entity';
import { DeliveryItem } from './entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { AssignCustomer } from './entities/assignCustomer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rider, DailyDelivery,DeliveryItem,Product,Customer,AssignCustomer]),

],
  controllers: [RiderController, ],
  providers: [RiderService],
})
export class RiderModule {}
