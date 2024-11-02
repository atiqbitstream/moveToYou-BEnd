import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CustomerService {


  constructor( @InjectRepository(Customer)
  private customersRepository: Repository<Customer>,){}

  create(newCustomer: CreateCustomerDto) {

    const customer = this.customersRepository.create(newCustomer);

    const savedCustomer = this.customersRepository.save(customer);

    return savedCustomer;
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return this.customersRepository.findOneBy({
      id
    })
  }

  async update(id: number, updateCustomer: UpdateCustomerDto) {

    await this.customersRepository.update(id,updateCustomer);

    return this.customersRepository.findOneBy({
        id
      });
    
  }

  async remove(id: number) {
    const customer = await this.customersRepository.findOneBy({
      id
    })

    customer.isDeleted = !customer.isDeleted;

    await this.customersRepository.save(customer);
  }
}



