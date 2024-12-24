import { Controller, Post } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
    constructor(private readonly fakerService: FakerService) {}

  @Post('customers')
  async populateCustomers()
  {
    return await this.fakerService.createRandomCustomers();
  }

  @Post('products')
  async populateProducts()
  {
     return await this.fakerService.createRandomProducts();
  }
}
