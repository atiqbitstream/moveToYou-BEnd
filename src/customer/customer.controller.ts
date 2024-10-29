import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private httpService:HttpService) {}

  @Get('verification')
  async userVerification() {
    console.log("This is user");

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'http://localhost:3000/auth/verifyToken', 
          {}, // empty body for POST request
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsInJvbGUiOiJVU0VSIiwiZW1haWwiOiJhdGlxQGdtYWlsLmNvbSIsImlhdCI6MTczMDE4MTgwMX0.Uw885YzvDRjpX_hwZ0aht3DD8Gp9P-W-96PNDwpvBZk' // replace with your token
            }
          }
        )
      );
      
      console.log('Verification response:', response.data);
      return response.data; // Return the response data to the caller
    } catch (error) {
      console.error('Error:', error.message);
      throw new HttpException('Verification failed', HttpStatus.UNAUTHORIZED);
    }
  }


  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
