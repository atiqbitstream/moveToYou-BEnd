import { Module } from '@nestjs/common';
import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';
import { RiderModule } from 'src/rider/rider.module';

@Module({
  imports:[CustomerModule,RiderModule],
  controllers: [FakerController],
  providers: [FakerService]
})
export class FakerModule {}
