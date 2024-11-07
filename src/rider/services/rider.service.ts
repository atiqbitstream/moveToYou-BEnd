import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from '../dto/riderDTOs/create-rider.dto';
import { UpdateRiderDto } from '../dto/riderDTOs/update-rider.dto';
import { Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyDeliveryDto } from '../dto/deliveryDTOs/create-delivery.dto';
import { DailyDelivery } from '../entities/dailyDelivery.entity';
import { UpdateDeliveryDto } from '../dto/deliveryDTOs/update-delivery.dto';
import { CreateDeliveryItemDto } from '../dto/deliveryDTOs/delivery-item.dto';
import { DeliveryItem } from '../entities/deliveryItem.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { CreateDeliveryWithItemDto } from '../dto/deliveryDTOs/delivery-with-item.dto';

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
}
