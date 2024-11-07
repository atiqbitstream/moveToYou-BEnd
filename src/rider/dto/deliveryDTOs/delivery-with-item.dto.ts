import { IsDateString, IsInt, ValidateNested } from "class-validator";
import { DeliveryItem } from "src/rider/entities/deliveryItem.entity";
import { CreateDeliveryItemDto } from "./delivery-item.dto";
import { Type } from "class-transformer";


export class CreateDeliveryWithItemDto
{
    @IsDateString()
    date:string;

    @IsInt()
    customerId:number;

    @IsInt()
    riderId:number;

    @ValidateNested({each:true})
    @Type(()=>CreateDeliveryItemDto)
    deliveryItems:CreateDeliveryItemDto[];




}