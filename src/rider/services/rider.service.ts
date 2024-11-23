import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateRiderDto } from '../dto/riderDTOs/create-rider.dto';
import { UpdateRiderDto } from '../dto/riderDTOs/update-rider.dto';
import { Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateDailyDeliveryDto } from '../dto/deliveryDTOs/create-delivery.dto';
import { DailyDelivery } from '../entities/dailyDelivery.entity';
import { UpdateDeliveryDto } from '../dto/deliveryDTOs/update-delivery.dto';
import { CreateDeliveryItemDto } from '../dto/deliveryDTOs/delivery-item.dto';
import { DeliveryItem } from '../entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateDeliveryWithItemDto } from '../dto/deliveryDTOs/delivery-with-item.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { AssignCustomer } from '../entities/assignCustomer.entity';
import { CreateAreaDto } from '../dto/areaDTOs/createArea.dto';
import { Area } from '../entities/area.entity';
import { UpdateAreaDto } from '../dto/areaDTOs/update-Area.dto';
import { Zone } from '../entities/zone.entity';
import { CreateZoneDto } from '../dto/areaDTOs/createZone.dto';
import { UpdateZoneDto } from '../dto/areaDTOs/update-zone.dto';

@Injectable()
export class RiderService {

  constructor( @InjectRepository(Rider)
  private ridersRepository: Repository<Rider>,
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
  private zoneRepository: Repository<Zone>
){}


  createRider(newRider: CreateRiderDto) {

    const rider = this.ridersRepository.create(newRider);

    const savedRider = this.ridersRepository.save(rider);

    return savedRider;
  }

  findAll() {
    return this.ridersRepository.find();
  }

  getRider(id: number) {
    return this.ridersRepository.findOneBy({
      id
    })
  }

  async updateRider(id: number, updateRider: UpdateRiderDto) {

    await this.ridersRepository.update(id,updateRider);

    return this.ridersRepository.findOneBy({
      id
    })
  }

  async removeRider(id: number) {
    const rider = await this.ridersRepository.findOneBy({
      id
    })

    rider.isDeleted = !rider.isDeleted;

    return await this.ridersRepository.save(rider);
  }



  //crud for dailyDelivery entity

  createDeliveryWithItem(newDeliveryWithItem:CreateDeliveryWithItemDto)
  {
    const deliveryWithItemData = {
      ...newDeliveryWithItem,
      date:new Date(newDeliveryWithItem.date)
    }

    const deliveryWithItem = this.dailyDeliveryRepository.create(deliveryWithItemData);

    const savedDeliveryWithItem = this.dailyDeliveryRepository.save(deliveryWithItem);

    return savedDeliveryWithItem;
  }

  createDelivery(newDelivery:CreateDailyDeliveryDto)
  {
    const deliveryData={
      ...newDelivery,
      date:new Date(newDelivery.date)
    }
       const dailyDelivery = this.dailyDeliveryRepository.create(deliveryData);

       const savedDelivery = this.dailyDeliveryRepository.save(dailyDelivery);

       return savedDelivery;

  }

  getDailyDelivery(id:number)
  {
    return this.dailyDeliveryRepository.findOneBy({
      id
    })
  }

  async updateDailyDelivery(id:number, updateDailyDelivery:UpdateDeliveryDto)
  {
    await this.dailyDeliveryRepository.update(id,updateDailyDelivery);

    return this.dailyDeliveryRepository.findOneBy({
      id
    })
  }

  async removeDelivery(id: number) {
    const dailyDelivery = await this.dailyDeliveryRepository.findOneBy({
      id
    })

    dailyDelivery.isDeleted = !dailyDelivery.isDeleted;

    return await this.dailyDeliveryRepository.save(dailyDelivery);
  }

  //crud for delivery item entity


  createDeliveryItem(newDelivery:CreateDeliveryItemDto)
  {
    const deliveryItemData = {
      ...newDelivery,
      data:new Date(newDelivery.date)
    }

    const DeliveryItem = this.deliveryItemRepository.create(deliveryItemData);

    const  savedDeliveryItem = this.deliveryItemRepository.save(DeliveryItem);

    return savedDeliveryItem;
  }

  getDelieveryItem(id:number)
  {
    return this.deliveryItemRepository.findOneBy({
      id
    })
  }

  async updateDeliveryItem(id:number,updateDeliveryitem:UpdateDeliveryDto)
  {
    await this.deliveryItemRepository.update(id,updateDeliveryitem);

    return this.deliveryItemRepository.findOneBy({
      id
    })

  }

  async removeDeliveryItem(id: number) {
    const deliveryItem = await this.deliveryItemRepository.findOneBy({
      id
    })

    deliveryItem.isDeleted = !deliveryItem.isDeleted;

    return await this.deliveryItemRepository.save(deliveryItem);
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

  async assignCustomersToRider(riderId:number, customerIds:number[])
  {
      const [rider, customers] = await Promise.all([
        this.ridersRepository.findOne({
          where : {id : riderId, isDeleted : false},
          relations: ['assignments']
        }),
        this.customerRepository.find({
          where: { id: In(customerIds), isDeleted: false }
      })
      ])

      if(!rider)
      {
        throw new NotFoundException(`Rider with ID ${riderId} not found `)
      }

      if(customers.length !== customerIds.length)
      {
         throw new BadRequestException('Some customers were not found');
      }

      const assignments = customers.map(customer=>{
        const assignment = new AssignCustomer();
        assignment.rider=rider;
        assignment.customer=customer;
        return assignment;
      });

      return await this.assignCustomerRepo.save(assignments);
  }

  async getAssignedCustomers(riderId:number)
  {
     const assignedCustomers = await this.assignCustomerRepo.createQueryBuilder('assignedCustomer')
     .leftJoinAndSelect('assignedCustomer.customer','customer')
     .where('assignedCustomer.rider.id=:riderId',{riderId})
     .andWhere('assignedCustomer.isDeleted=:isDeleted',{isDeleted:false})
     .select([
      'assignedCustomer.id',
      'customer.id',
      'customer.firstName',
      'customer.lastName',
      'customer.phoneNumber',
      'customer.address',
      'customer.sector'
     ])
     .getMany();

     return assignedCustomers.map(assignedCustomer=>assignedCustomer.customer)
  }

  async updateAssignedCustomers(assignCustomerId:number,newRiderId:number, newCustomerIds:number[])
  {
     const assignedCustomers = await this.assignCustomerRepo.findOne({
      where : {id:assignCustomerId, isDeleted:false},
      relations:['customer']
     })

     if(!assignedCustomers)
     {
      throw new NotFoundException('Assingment with ID ${assignmentId} not found');
     }

     const newRider = await this.ridersRepository.findOne({
      where:{id:newRiderId, isDeleted:false}
     });

     if(!newRider)
     {
      throw new NotFoundException(`Rider with ID ${newRiderId} not found`)
     }

     const newCustomers =await this.customerRepository.find({
        where : {id:In(newCustomerIds), isDeleted:false}
     })

     if(newCustomers.length!==newCustomerIds.length)
     {
      throw new BadRequestException('Some customers were not found')
     }

    assignedCustomers.rider=newRider;
    assignedCustomers.customer=newCustomers[0];

    return await this.assignCustomerRepo.save(assignedCustomers);

  }

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
