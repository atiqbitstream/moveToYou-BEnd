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
import { Area } from './entities/area.entity';
import { Zone } from './entities/zone.entity';
import { HttpModule } from '@nestjs/axios';
import { TokenService } from 'src/customer/services/token.service';

@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Rider, DailyDelivery,DeliveryItem,Product,Customer,AssignCustomer,Area,Zone]),

],
  controllers: [RiderController, ],
  providers: [RiderService,TokenService],
})
export class RiderModule {}
