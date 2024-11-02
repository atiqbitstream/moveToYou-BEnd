import { Module } from '@nestjs/common';
import { RiderService } from './services/rider.service';
import { RiderController } from './controllers/rider.controller';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyDelivery } from './entities/dailyDelivery.entity';
import { DeliveryItem } from './entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rider, DailyDelivery,DeliveryItem,Product]),

],
  controllers: [RiderController, ],
  providers: [RiderService],
})
export class RiderModule {}
