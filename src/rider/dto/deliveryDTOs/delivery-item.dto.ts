import { IsArray, IsDateString, IsInt, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class DeliveryItemDto {
    @IsInt()
    productId: number;

    @IsInt()
    quantity: number;

    @IsNumber()
    price: number;

    @IsDateString()
    date: string;
}

export class CreateDeliveryItemDto {
    @IsDateString()
    date: string;

    @IsInt()
    dailyDeliveryId: number;

    @IsArray()
    @IsNotEmpty()
    deliveryItems: DeliveryItemDto[];
}
