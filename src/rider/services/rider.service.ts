import { Inject, Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDailyDeliveryDto } from '../dto/deliveryDTOs/create-delivery.dto';
import { DailyDelivery } from '../entities/dailyDelivery.entity';
import { UpdateDeliveryDto } from '../dto/deliveryDTOs/update-delivery.dto';
import { CreateDeliveryItemDto, DeliveryItemDto } from '../dto/deliveryDTOs/delivery-item.dto';
import { DeliveryItem } from '../entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';


import { CreateDeliveryWithItemDto } from '../dto/deliveryDTOs/delivery-with-item.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { AssignCustomer } from '../entities/assignCustomer.entity';
import { CreateAreaDto } from '../dto/areaDTOs/createArea.dto';
import { Area } from '../entities/area.entity';
import { UpdateAreaDto } from '../dto/areaDTOs/update-Area.dto';
import { Zone } from '../entities/zone.entity';
import { CreateZoneDto } from '../dto/areaDTOs/createZone.dto';
import { UpdateZoneDto } from '../dto/areaDTOs/update-zone.dto';
import { HttpService } from '@nestjs/axios';
import { REQUEST } from '@nestjs/core';
import { CreateProductDto } from '../dto/productDTOs/create-product.dto';
import { UpdateProductDto } from '../dto/productDTOs/update-product.dto';
import { UpdateRouteDTO } from '../dto/routeDTOs/update-route.dto';
import { Route } from '../entities/route.entity';
import { ReceiptService } from 'src/customer/services/receipt.service';



@Injectable()
export class RiderService {

  constructor( 
  @InjectRepository(DailyDelivery)
  private dailyDeliveryRepository: Repository<DailyDelivery>,
  @InjectRepository(DeliveryItem)
  private deliveryItemRepository: Repository<DeliveryItem>,
  @InjectRepository(Product)
  private productRepository: Repository<Product>,
  @InjectRepository(Customer)
  private customerRepository : Repository<Customer>,
  @InjectRepository(AssignCustomer)
  private assignCustomerRepo : Repository<AssignCustomer>,
  @InjectRepository(Area)
  private areaRepository: Repository<Area>,
  @InjectRepository(Zone)
  private zoneRepository: Repository<Zone>,

  private httpService:HttpService,

  private receiptService:ReceiptService,

  @Inject(REQUEST) private readonly request:Request,

  @InjectRepository(Route)
  private routeRepository: Repository<Route>
){}


 
  

 

  //crud for dailyDelivery entity

  createDeliveryWithItem(newDeliveryWithItem:CreateDeliveryWithItemDto)
  {
    // const deliveryWithItemData = {
    //   ...newDeliveryWithItem,
    //   date:new Date(newDeliveryWithItem.date)
    // }

    // const deliveryWithItem = this.dailyDeliveryRepository.create(deliveryWithItemData);

    // const savedDeliveryWithItem = this.dailyDeliveryRepository.save(deliveryWithItem);

    // return savedDeliveryWithItem;
  }

  createDelivery(newDelivery:CreateDailyDeliveryDto)
  {
    const deliveryData={
      ...newDelivery,
      date:new Date(newDelivery.date)
    }
    return this.dailyDeliveryRepository.save(
      this.dailyDeliveryRepository.create(deliveryData)
    );

  }

  getDailyDelivery(riderId:number)
  {
    return this.dailyDeliveryRepository.find({
      where: { 
        riderId: riderId 
      },
      relations: ['customer'], // This will fetch the related customer data
      select: {
        id: true,
        date: true,
        // Select specific daily delivery fields you want
        customer: {
          // Specify which customer fields you want to return
          id: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          address: true,
          sector: true,
          street: true,
          googlePin:{
            longitude:true,
            latitude:true
          },
          organization:true,
          status:true
          // Add other fields as needed
        }
      }
    });
  }

  //get daily deliveries with items

  getDailyDeliveryWithItems(riderId:number)
  {
    return this.dailyDeliveryRepository.find({
      where: { 
        riderId: riderId 
      },
      relations: ['customer','customer.route','deliveryItems.product'], // This will fetch the related customer data
      order:{
         customer:{
          route:{
            index:'ASC',
          }
         }
      },
      select: {
        id: true,
        date: true,
        // Select specific daily delivery fields you want
        customer: {
          // Specify which customer fields you want to return
          id: true,
          firstName: true,
          // Add other fields as needed
        }
      }
    });
  }

  async updateDailyDelivery(id:number, updateDailyDelivery:UpdateDeliveryDto)
  {
    await this.dailyDeliveryRepository.update(id,updateDailyDelivery);

    return this.dailyDeliveryRepository.findOneBy({
      id
    })
  }

  async updateRoute(riderId:number,updateRouteData:UpdateRouteDTO[])
  {

    await this.routeRepository.delete({riderId});
    
    const routesToInsert = updateRouteData.map(route=>({
      riderId,
      customerId : route.customerId,
      index : route.index
    }))

    await this.routeRepository.save(routesToInsert)

    return this.routeRepository.find({
      where:{riderId},
      order:{index : 'ASC'}
    })

  }

  async removeDelivery(id: number) {
    const dailyDelivery = await this.dailyDeliveryRepository.findOneBy({
      id
    })

    dailyDelivery.isDeleted = !dailyDelivery.isDeleted;

    await this.dailyDeliveryRepository.save(dailyDelivery);
  }

  //crud for delivery item entity


  async createDeliveryItem(newDelivery: CreateDeliveryItemDto) {
    // Ensure deliveryItems exist
    if (!newDelivery.deliveryItems || newDelivery.deliveryItems.length === 0) {
        throw new Error('deliveryItems array is missing in the request.');
    }

    const deliveryItems = newDelivery.deliveryItems.map(item => {
        return this.deliveryItemRepository.create({
            dailyDeliveryId: newDelivery.dailyDeliveryId, // Ensure dailyDeliveryId is included
            productId: item.productId,
            quantity: item.quantity, 
            price: item.price, 
            date: item.date ? new Date(item.date) : new Date()
        });
    });

    const savedDeliveryItems = await this.deliveryItemRepository.save(deliveryItems);

    await this.receiptService.createOrUpdateReceipt(newDelivery.dailyDeliveryId);

    return savedDeliveryItems;
}


  getDelieveryItem(dailyDeliveryId:number)
  {
    return this.deliveryItemRepository.find({
      where:{
        dailyDeliveryId:dailyDeliveryId,
      }
    })
  }

  async updateDeliveryItem(id:number,updateDeliveryitem:UpdateDeliveryDto)
  {
    await this.deliveryItemRepository.update(id,updateDeliveryitem);

    const updatedItem = await this.deliveryItemRepository.findOneBy({id});

    if(updatedItem)
    {
      await this.receiptService.createOrUpdateReceipt(updatedItem.dailyDeliveryId)
    }

    return updatedItem;

  }

  async removeDeliveryItem(id: number) {
    const deliveryItem = await this.deliveryItemRepository.findOneBy({
      id
    })

    deliveryItem.isDeleted = !deliveryItem.isDeleted;

     await this.deliveryItemRepository.save(deliveryItem);

     await this.receiptService.createOrUpdateReceipt(deliveryItem.dailyDeliveryId);
  }

  //crud for product repository

  createProduct(newProduct:CreateProductDto)
  {
      const product = this.productRepository.create(newProduct);

      const savedProduct = this.productRepository.save(product);

      return savedProduct;
  }

  getProduct(id:number)
  {
    return this.productRepository.findOneBy({
      id
    })
  }

  getAllProducts(organizationId:number)
  {
    return this.productRepository.find({
      where:{
        organizationId:organizationId
      }
    })
  }

  async updateProduct(id:number, updateProduct:UpdateProductDto)
  {
    await this.productRepository.update(id,updateProduct);

    return this.productRepository.findOneBy({
      id
    })
  }

  async removeProduct(id: number) {
    const product = await this.productRepository.findOneBy({
      id
    })

    product.isDeleted = !product.isDeleted;

    return await this.productRepository.save(product);
  }

  //crud for assignCustomer To Riders

  async assignCustomersToRider(riderId:number, customerId:number)
  {
   const assignCustomer = this.assignCustomerRepo.create({
      customerId: customerId,
      riderId: riderId,
    });
    return this.assignCustomerRepo.save(assignCustomer);
  }

  async getAssignedCustomers(riderId:number)
  {
    const assignments = await this.assignCustomerRepo.find({
      where: { riderId: riderId, isDeleted: false },  // filter by riderId and ensure it's not deleted
      relations: ['customer','customer.route','customer.dailyDeliveries'],
      order:{
        customer:{
          route:{
            index:'ASC'
          }
        }
      }
    });
  
    return assignments.map(assignment => assignment.customer);
  }

  // async updateAssignedCustomers(assignCustomerId:number,newRiderId:number, newCustomerIds:number[])
  // {
  //    const assignedCustomers = await this.assignCustomerRepo.findOne({
  //     where : {id:assignCustomerId, isDeleted:false},
  //     relations:['customer']
  //    })

  //    if(!assignedCustomers)
  //    {
  //     throw new NotFoundException('Assingment with ID ${assignmentId} not found');
  //    }

  //    const newRider = await this.ridersProfileRepository.findOne({
  //     where:{id:newRiderId, isDeleted:false}
  //    });

  //    if(!newRider)
  //    {
  //     throw new NotFoundException(`Rider with ID ${newRiderId} not found`)
  //    }

  //    const newCustomers =await this.customerRepository.find({
  //       where : {id:In(newCustomerIds), isDeleted:false}
  //    })

  //    if(newCustomers.length!==newCustomerIds.length)
  //    {
  //     throw new BadRequestException('Some customers were not found')
  //    }

  //   assignedCustomers.rider=newRider;
  //   assignedCustomers.customer=newCustomers[0];

  //   return await this.assignCustomerRepo.save(assignedCustomers);

  // }

  async removeAssignedCustomers(id:number)
  {
      const assignedCustomers = await this.assignCustomerRepo.findOneBy({
        id
      })

      assignedCustomers.isDeleted=!assignedCustomers.isDeleted;

      return await this.assignCustomerRepo.save(assignedCustomers);
  }

  //crud for Area
  createArea(newArea:CreateAreaDto)
  {
    const area = this.areaRepository.create(newArea);

    const savedArea = this.areaRepository.save(area);

    return savedArea;
  }

  async getArea(id:number)
  {
    return await this.areaRepository.findOneBy({
      id
    })
  }

  async updateArea(id:number, updateArea:UpdateAreaDto)
  {
    await this.areaRepository.update(id,updateArea);

    return this.areaRepository.findOneBy({id});
  }

  async deleteArea(id:number)
  {
    const area= await this.areaRepository.findOneBy({id});

    area.isDeleted=!area.isDeleted;

    return await this.areaRepository.save(area);
  }

  //crud for zone entity
  createZone(newZone:CreateZoneDto)
  {
    const zone = this.zoneRepository.create(newZone);

    const savedZone = this.zoneRepository.save(zone);

    return savedZone;
  }

  getZone(id:number)
  {
   return this.zoneRepository.findOneBy({id});
  }

  async updateZone(id:number, updateZone:UpdateZoneDto)
  {
     await this.zoneRepository.update(id,updateZone);

     return this.zoneRepository.findOneBy({id});
  }

  async deleteZone(id:number)
  {
     const zone =await  this.zoneRepository.findOneBy({id});

     zone.isDeleted=!zone.isDeleted;

     return this.zoneRepository.save(zone);

  }
  
}
