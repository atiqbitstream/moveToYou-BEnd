import { CustomerModule } from 'src/customer/customer.module';
import { Customer } from 'src/customer/entities/customer.entity';
import { forwardRef, Module } from '@nestjs/common';
import { RiderService } from './services/rider.service';
import { RiderController } from './controllers/rider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyDelivery } from './entities/dailyDelivery.entity';
import { DeliveryItem } from './entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { AssignCustomer } from './entities/assignCustomer.entity';
import { Area } from './entities/area.entity';
import { Zone } from './entities/zone.entity';
import { HttpModule } from '@nestjs/axios';
import { TokenService } from 'src/shared/services/token.service';
import { Route } from './entities/route.entity';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => CustomerModule),  // Fix circular dependency
    TypeOrmModule.forFeature([
      DailyDelivery,
      DeliveryItem,
      Product,
      Customer,
      AssignCustomer,
      Area,
      Zone,
      Route
    ])
  ],
  controllers: [RiderController],
  providers: [RiderService, TokenService],
  exports: [RiderService]
})
export class RiderModule {}
