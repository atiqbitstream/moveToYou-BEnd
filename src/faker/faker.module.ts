import { Module } from '@nestjs/common';
import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports:[CustomerModule],
  controllers: [FakerController],
  providers: [FakerService]
})
export class FakerModule {}
