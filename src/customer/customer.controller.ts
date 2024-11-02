import { Customer } from './entities/customer.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { promises } from 'dns';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private httpService:HttpService) {}


  @UseGuards(JwtAuthGuard)
  @Get('verification')
  async userVerification() {
    console.log("i am in customerveriffication controller")   
  }


  @Post('create')
  async createCustomer(@Body() createCustomer:CreateCustomerDto){
    return this.customerService.create(createCustomer);
  }

  @Get('profile/:id')
  getCustomer(@Param('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Patch('update/:id')
  updateCustomer(@Param('id') id: number, @Body() updateCustomer: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomer);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerService.remove(id);
  }
}
