import { RiderModule } from './../rider/rider.module';
import { DeliveryItem } from './../rider/entities/deliveryItem.entity';
import { DailyDelivery } from 'src/rider/entities/dailyDelivery.entity';
import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './customer.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TokenService } from '../shared/services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Route } from 'src/rider/entities/route.entity';
import { Invoice } from './entities/invoice.entity';
import { Receipt } from './entities/receipt.entity';
import { ReceiptService } from './services/receipt.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => RiderModule),  // Fix circular dependency
    TypeOrmModule.forFeature([Customer, Route, DailyDelivery, DeliveryItem, Invoice, Receipt])
  ],
  controllers: [CustomerController],
  providers: [CustomerService, TokenService, ReceiptService],
  exports: [CustomerService, ReceiptService]

})
export class CustomerModule {}
