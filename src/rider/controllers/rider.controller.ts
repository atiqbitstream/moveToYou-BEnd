
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateDailyDeliveryDto } from '../dto/deliveryDTOs/create-delivery.dto';
import { RiderService } from '../services/rider.service';
import { UpdateDeliveryDto } from '../dto/deliveryDTOs/update-delivery.dto';

import { CreateDeliveryItemDto } from '../dto/deliveryDTOs/delivery-item.dto';
import { UpdateDeliveryItemDto } from '../dto/deliveryDTOs/update-delivery-item.dto';


import { CreateDeliveryWithItemDto } from '../dto/deliveryDTOs/delivery-with-item.dto';
import { CreateAreaDto } from '../dto/areaDTOs/createArea.dto';
import { UpdateAreaDto } from '../dto/areaDTOs/update-Area.dto';
import { CreateZoneDto } from '../dto/areaDTOs/createZone.dto';
import { UpdateZoneDto } from '../dto/areaDTOs/update-zone.dto';
import { Request } from '@nestjs/common'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateProductDto } from '../dto/productDTOs/create-product.dto';
import { UpdateProductDto } from '../dto/productDTOs/update-product.dto';
import { UpdateRouteDTO } from '../dto/routeDTOs/update-route.dto';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}


  

  //crud for dailyDelivery

  //create dailyDelivery with deliveryItems array

  @Post('createDeliveryWithItem')
  createDeliveryWithItem(
    @Body() newDeliveryWithItem: CreateDeliveryWithItemDto,
  ) {
    return this.riderService.createDeliveryWithItem(newDeliveryWithItem);
  }

  //create dailyDelivery without deliveryItems array
  @UseGuards(JwtAuthGuard)
  @Post('createDailyDelivery')
  createDailyDelivery(@Body() newDelivery: CreateDailyDeliveryDto, @Request() req) {
    console.log('Controller received newDelivery:', newDelivery);

    if(!newDelivery.date)
    {
      newDelivery.date=new Date().toISOString();
    }
    newDelivery.riderId=req.user.id;

    return this.riderService.createDelivery(newDelivery);
  }


  @UseGuards(JwtAuthGuard)
  @Get('getDailyDelivery')
  getDailyDelivery( @Request() req) {

    const riderId = req.user.id;
    return this.riderService.getDailyDelivery(riderId);
  }

  //get Daily Delivery with delivery items
  
  @UseGuards(JwtAuthGuard)
  @Get('getDailyDeliveryWithItems')
  getDailyDeliveryWithItems( @Request() req) {

    const riderId = req.user.id;
    return this.riderService.getDailyDeliveryWithItems(riderId);
  }


  @Patch('updateDailyDelivery/:id')
  updateDailyDelivery(
    @Param('id') id: number,
    @Body() updateDailyDelivery: UpdateDeliveryDto,
  ) {
    return this.riderService.updateDailyDelivery(id, updateDailyDelivery);
  }

  @Delete('delete/dailyDelivery/:id')
  removeDailyDelivery(@Param('id') id: number) {
    return this.riderService.removeDelivery(id);
  }

  //crud for deliveryItem entity
  @Post('createDeliveryItem')
  createDeliveryItem(@Body() newDeliveryItem: CreateDeliveryItemDto) {
    if(!newDeliveryItem.date)
      {
        newDeliveryItem.date=new Date().toISOString();
      }
    return this.riderService.createDeliveryItem(newDeliveryItem);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('updateRoutes')
  updateRoute(@Request() req, @Body() updateRouteData:UpdateRouteDTO[])
  {
     const riderId = req.user.id;
     console.log("The rider id in update route is : ",riderId)
     console.log("the updatedroutedata is : ",updateRouteData)
     return this.riderService.updateRoute(riderId, updateRouteData)
  }

  @Get('getDeliveryItem')
  getDeliveryItem(@Param('dailyDeliveryId') dailyDeliveryId: number) {
 
    return this.riderService.getDelieveryItem(dailyDeliveryId);
  }

  @Patch('updateDeliveryItem/:id')
  updateDeliveryItem(
    @Param('id') id: number,
    @Body() updateDeliveryItem: UpdateDeliveryItemDto,
  ) {
    return this.riderService.updateDeliveryItem(id, updateDeliveryItem);
  }

  @Delete('delete/deliveryItem/:id')
  removeDeliveryItem(@Param('id') id: number) {
    return this.riderService.removeDeliveryItem(id);
  }

  //crud for product entity
  @Post('createProduct')
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.riderService.createProduct(newProduct);
  }

  @Get('getProduct/:id')
  getProduct(@Param('id') id: number) {
    return this.riderService.getProduct(id);
  }


  @UseGuards(JwtAuthGuard)
  @Get('getAllProducts')
  getAllProducts(@Request() req)
  {
    const orgId = req.user.organizationId
    return this.riderService.getAllProducts(orgId)
  }

  @Patch('updateProduct/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
  ) {
    return this.riderService.updateProduct(id, updateProduct);
  }

  @Delete('delete/product/:id')
  removeProduct(@Param('id') id: number) {
    return this.riderService.removeProduct(id);
  }

  //crud for assignCustomer   (we can assign customers to rider)
   @Post('assignCustomer/:riderId')
  async assignCustomers(
    @Param('riderId') riderId: number,
    @Body('customerId') customerId: number,
  ) {
    const assignedCustomers = await this.riderService.assignCustomersToRider(
      riderId,
      customerId,
    );

    return {
      message: 'customer assigned successfully to Rider',
      data: assignedCustomers,
    };
  }

  @Get('getAssignedCustomers/:riderId')
  async getAssignedCustomers(@Param('riderId', ParseIntPipe) riderId: number) {
    const assignedCustomers =
      await this.riderService.getAssignedCustomers(riderId);

    return assignedCustomers;
  }

  // @Patch('updateAssignedCustomers/:assignCustomerId')
  // async updateAssignedCustomers(
  //   @Param('assignCustomerId', ParseIntPipe) assignCustomerId: number,
  //   @Body()
  //   updateData: {
  //     newRiderId: number;
  //     newCustomerIds: number[];
  //   },
  // ) {
  //   const updatedAssignedCustomers =
  //     await this.riderService.updateAssignedCustomers(
  //       assignCustomerId,
  //       updateData.newRiderId,
  //       updateData.newCustomerIds,
  //     );

  //   return updatedAssignedCustomers;
  // }

  @Delete('delete/assignedCustomer/:id')
  removeAssignedCustomers(@Param('id') id: number) {
    return this.riderService.removeAssignedCustomers(id);
  }

  //Crud for Area Entity
  @Post('createArea')
  createArea(@Body() newArea:CreateAreaDto)
  {
     return this.riderService.createArea(newArea);
  }

  @Get('getArea/:id')
  getArea(@Param('id') id:number)
  {
    return this.riderService.getArea(id);
  }

  @Patch('updateArea/:id')
  updateArea(@Param('id') id:number,@Body() updateArea:UpdateAreaDto)
  {
    return this.riderService.updateArea(id,updateArea)
  }


  @Delete('deleteArea/:id')
  deleteArea(id:number)
  {
    return this.riderService.deleteArea(id);
  }

  //crud for zone entity
  @Post('createZone')
  createZone(@Body() newZone:CreateZoneDto)
  {
    return this.riderService.createZone(newZone);
  }


  @Get('getZone/:id')
  getZone(@Param('id') id:number)
  {
    return this.riderService.getZone(id);
  }

  @Patch('updateZone/:id')
  updateZone(@Param('id') id:number,@Body() updateZone:UpdateZoneDto)
  {
  return this.riderService.updateZone(id,updateZone);
  }


  @Delete('deleteZone/:id')
  deleteZone(id:number)
  {
    return this.riderService.deleteZone(id);
  }
  
}
