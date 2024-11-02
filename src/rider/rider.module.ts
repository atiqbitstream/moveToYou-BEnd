import { Module } from '@nestjs/common';
import { RiderService } from './services/rider.service';
import { RiderController } from './controllers/rider.controller';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyDelivery } from './entities/dailyDelivery.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rider, DailyDelivery]),

],
  controllers: [RiderController, ],
  providers: [RiderService],
})
export class RiderModule {}
