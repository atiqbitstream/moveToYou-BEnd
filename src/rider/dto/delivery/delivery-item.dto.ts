import { IsDateString, } from "class-validator";

export class CreateDeliveryItemDto
{

    @IsDateString()
    date: string;

    Qty:number;

    price:number;

    productId:number;
}