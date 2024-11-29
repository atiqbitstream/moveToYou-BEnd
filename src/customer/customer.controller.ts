import { Customer } from './entities/customer.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards, Request} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { promises } from 'dns';
import { RolesGuard } from 'src/rider/guards/roles.guard';
import { Roles } from 'src/rider/decorators/roles.decorator';
import { ERole } from 'src/rider/enums/roles.enum';

@UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(ERole.ADMIN)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private httpService:HttpService) {}



  @Get('verification')
  async userVerification() {
    console.log("i am in customerveriffication controller")   
  }


  
  @Post('create')
  async createCustomer(@Body() createCustomer:CreateCustomerDto){
    return this.customerService.create(createCustomer);
  }



  @Get('getCustomer')
  getCustomer(@Query('customerId') customerId:number, @Query('organizationId') organizationId:number) {
    return this.customerService.findOne(customerId,organizationId);
  }

  @Get('getAllCustomers')
  async getAllCustomersByOrganization(@Query('organizationId') organizationId:number):Promise<Customer[]>
  {
       return this.customerService.findAll(organizationId);
  }

  @Patch('update/:id')
  updateCustomer(@Param('id') id: number, @Body() updateCustomer: UpdateCustomerDto, @Request() req):Promise<Customer> {

    const organizationId= req.user.organizationId;

    return this.customerService.update(id,organizationId, updateCustomer);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number, @Request() req) {

    const organizationId = req.user.organizationId;

    return this.customerService.remove(id,organizationId);
  }
}
