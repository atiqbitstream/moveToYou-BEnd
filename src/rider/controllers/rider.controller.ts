import { AssignCustomer } from './../entities/assignCustomer.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateRiderDto } from '../dto/riderDTOs/create-rider.dto';
import { UpdateRiderDto } from '../dto/riderDTOs/update-rider.dto';
import { CreateDailyDeliveryDto } from '../dto/deliveryDTOs/create-delivery.dto';
import { RiderService } from '../services/rider.service';
import { UpdateDeliveryDto } from '../dto/deliveryDTOs/update-delivery.dto';
import { get } from 'http';
import { CreateDeliveryItemDto } from '../dto/deliveryDTOs/delivery-item.dto';
import { UpdateDeliveryItemDto } from '../dto/deliveryDTOs/update-delivery-item.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateDeliveryWithItemDto } from '../dto/deliveryDTOs/delivery-with-item.dto';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post('create')
  createRider(@Body() createRiderDto: CreateRiderDto) {
    return this.riderService.createRider(createRiderDto);
  }

  @Get()
  findAllRiders() {
    return this.riderService.findAll();
  }

  @Get('profile/:id')
  getRider(@Param('id') id: number) {
    return this.riderService.getRider(id);
  }

  @Patch('update/:id')
  updateRider(@Param('id') id: number, @Body() updateRider: UpdateRiderDto) {
    return this.riderService.updateRider(id, updateRider);
  }

  @Delete('delete/:id')
  removeRider(@Param('id') id: number) {
    return this.riderService.removeRider(id);
  }


  //crud for dailyDelivery

  //create dailyDelivery with deliveryItems array

  @Post('createDeliveryWithItem')
  createDeliveryWithItem(@Body() newDeliveryWithItem:CreateDeliveryWithItemDto)
  {
     return this.riderService.createDeliveryWithItem(newDeliveryWithItem);
  }

  //create dailyDelivery without deliveryItems array

@Post('createDailyDelivery')
  createDailyDelivery(@Body() newDelivery:CreateDailyDeliveryDto)
  {
    console.log('Controller received newDelivery:', newDelivery);
    return this.riderService.createDelivery(newDelivery);
  }

  @Get('getDailyDelivery/:id')
  getDailyDelivery(@Param('id') id:number)
  {
    return this.riderService.getDailyDelivery(id);
  }

  @Patch('updateDailyDelivery/:id')
  updateDailyDelivery(@Param('id') id:number ,@Body() updateDailyDelivery:UpdateDeliveryDto)
  {
    return this.riderService.updateDailyDelivery(id,updateDailyDelivery)
  }

  @Delete('delete/dailyDelivery/:id')
  removeDailyDelivery(@Param('id') id: number) {
    return this.riderService.removeDelivery(id);
  }

  //crud for deliveryItem entity
@Post('createDeliveryItem')
  createDeliveryItem(@Body() newDeliveryItem:CreateDeliveryItemDto)
  {
     return this.riderService.createDeliveryItem(newDeliveryItem);
  }

  @Get('getDeliveryItem')
  getDeliveryItem(@Param('id') id:number)
  {
     return this.riderService.getDelieveryItem(id);
  }

  @Patch('updateDeliveryItem/:id')
  updateDeliveryItem(@Param('id') id:number, @Body() updateDeliveryItem:UpdateDeliveryItemDto)
  {
    return this.riderService.updateDeliveryItem(id,updateDeliveryItem)
  }

  @Delete('delete/deliveryItem/:id')
  removeDeliveryItem(@Param('id') id: number) {
    return this.riderService.removeDeliveryItem(id);
  }

  //crud for product entity
 @Post('createProduct')
  createProduct(@Body() newProduct:CreateProductDto)
  {
     return this.riderService.createProduct(newProduct);
  }

  @Get('getProduct/:id')
  getProduct(@Param('id') id:number)
  {
    return this.riderService.getProduct(id);
  }

  @Patch('updateProduct/:id')
  updateProduct(@Param('id') id:number, @Body() updateProduct:UpdateProductDto)
  {
    return this.riderService.updateProduct(id,updateProduct);
  }

  @Delete('delete/product/:id')
  removeProduct(@Param('id') id: number) {
    return this.riderService.removeProduct(id);
  }


  //crud for assignCustomer
@Post('assignCustomers/:riderId')
  async assignCustomers(@Param('riderId', ParseIntPipe) riderId:number, @Body('customerIds') customerIds : number[])
  {
    const assignedCustomers = await this.riderService.assignCustomersToRider(riderId,customerIds);

    return  {
      message : 'customers assigned successfully to Riders',
      data : assignedCustomers
    }
  }
}
