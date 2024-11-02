import {
  IsDateString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDailyDeliveryDto {
  @IsDateString()
  date: string;

  @IsInt()
  customerId: number;

  @IsInt()
  riderId: number;

  @IsBoolean()
  @IsOptional()
  cancelled?: boolean;

  @IsString()
  @IsOptional()
  cancelledReason?: string;
}
