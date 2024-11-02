import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from '../dto/rider/create-rider.dto';
import { UpdateRiderDto } from '../dto/rider/update-rider.dto';
import { Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyDeliveryDto } from '../dto/delivery/create-delivery.dto';
import { DailyDelivery } from '../entities/dailyDelivery.entity';
import { UpdateDeliveryDto } from '../dto/delivery/update-delivery.dto';
import { CreateDeliveryItemDto } from '../dto/delivery/delivery-item.dto';
import { DeliveryItem } from '../entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

@Injectable()
export class RiderService {

  constructor( @InjectRepository(Rider)
  private ridersRepository: Repository<Rider>,
  @InjectRepository(DailyDelivery)
  private dailyDeliveryRepository: Repository<DailyDelivery>,
  @InjectRepository(DeliveryItem)
  private deliveryItemRepository: Repository<DeliveryItem>,
  @InjectRepository(Product)
  private productRepository: Repository<Product>
){}


  createRider(newRider: CreateRiderDto) {

    const rider = this.ridersRepository.create(newRider);

    const savedRider = this.ridersRepository.save(rider);

    return savedRider;
  }

  findAll() {
    return `This action returns all rider`;
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

  removeRider(id: number) {
    return `This action removes a #${id} rider`;
  }



  //crud for dailyDleivery entity

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
}
