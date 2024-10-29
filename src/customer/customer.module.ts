import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  imports:[HttpModule,TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService,TokenService],
})
export class CustomerModule {}
