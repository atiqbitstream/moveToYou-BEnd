import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from '../dto/rider/create-rider.dto';
import { UpdateRiderDto } from '../dto/rider/update-rider.dto';
import { Rider } from '../entities/rider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDailyDeliveryDto } from '../dto/delivery/create-delivery.dto';
import { DailyDelivery } from '../entities/dailyDelivery.entity';
import { UpdateDeliveryDto } from '../dto/delivery/update-delivery.dto';

@Injectable()
export class RiderService {

  constructor( @InjectRepository(Rider)
  private ridersRepository: Repository<Rider>,
  @InjectRepository(DailyDelivery)
  private dailyDeliveryRepository: Repository<DailyDelivery>
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
}
