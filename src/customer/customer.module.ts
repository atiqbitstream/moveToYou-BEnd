import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TokenService } from './services/token.service';

@Module({
  imports:[HttpModule],
  controllers: [CustomerController],
  providers: [CustomerService,TokenService],
})
export class CustomerModule {}
