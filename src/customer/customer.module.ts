import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './customer.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TokenService } from '../shared/services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Route } from 'src/rider/entities/route.entity';

@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Customer,Route])],
  controllers: [CustomerController],
  providers: [CustomerService,TokenService],
  exports:[CustomerService]
})
export class CustomerModule {}
