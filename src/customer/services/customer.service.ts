
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../entities/customer.entity';
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

  async findAll(organizationId:number):Promise<Customer[]> {
    if(!organizationId)
    {
       throw new NotFoundException('orgnizationId not found')
    }

    const customers= await this.customersRepository.find({
      where:{
        organizationId:organizationId
      }
    })

    if(customers.length===0)
    {
      throw new NotFoundException(`No Customers found for organization ID ${organizationId}`)
    }

    return customers;
  }

  async findOne(customerId,organizationId):Promise<CreateCustomerDto> {
    
    if(!customerId || !organizationId)
    {
      throw new Error('customerId and OrganizationId are required !')
    }

    const customer =await this.customersRepository.findOne({
      where:{
        id:customerId,
        organizationId:organizationId
      }
    })

    if(!customer)
    {
      throw new NotFoundException(`Customer with id ${customerId} does not belong to organizationId ${organizationId}`)
    }

    return customer;
  }

  async update(id: number,organizationId:number, updateCustomer: UpdateCustomerDto):Promise<Customer> {

   if(!id)
   {
    throw new BadRequestException('customer Id is required');
   }

   try{
    const exisitingCustomer =await this.customersRepository.findOne({
      where:{
          id:id,
          organizationId:organizationId
      }
    })

    const updatedCustomer =  await this.customersRepository.merge(exisitingCustomer,updateCustomer);

    const savedCustomer = await this.customersRepository.save(updatedCustomer);

    return savedCustomer;
   }catch(error)
   {
    console.log(error);
   }


    
  }

  async remove(id: number, organizationId:number) {

    if(!id || organizationId)
    {
      throw new NotFoundException(`customer with id ${id} is null and organization with id ${organizationId} is null`)
    }
    const customer = await this.customersRepository.findOne({
      where:{
        id,
        organizationId
      }
    })

    if(!customer)
    {
      throw new NotFoundException(`customer not found and does not exist`)
    }


    customer.isDeleted = true;

    await this.customersRepository.save(customer);
  }
}



