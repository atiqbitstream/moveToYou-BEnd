import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRiderDto } from '../dto/rider/create-rider.dto';
import { UpdateRiderDto } from '../dto/rider/update-rider.dto';
import { CreateDailyDeliveryDto } from '../dto/delivery/create-delivery.dto';
import { RiderService } from '../services/rider.service';
import { UpdateDeliveryDto } from '../dto/delivery/update-delivery.dto';
import { get } from 'http';
import { CreateDeliveryItemDto } from '../dto/delivery/delivery-item.dto';
import { UpdateDeliveryItemDto } from '../dto/delivery/update-delivery-item.dto';

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

  @Delete(':id')
  removeRider(@Param('id') id: string) {
    return this.riderService.removeRider(+id);
  }


  //crud for dailyDelivery
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

  @Patch('updateDeliveryItem')
  updateDeliveryItem(@Param('id') id:number, @Body() updateDeliveryItem:UpdateDeliveryItemDto)
  {
    return this.riderService.updateDeliveryItem(id,updateDeliveryItem)
  }

}
