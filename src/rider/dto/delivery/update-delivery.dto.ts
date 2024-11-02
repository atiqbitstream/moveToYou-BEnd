import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDailyDeliveryDto) {

    
}
