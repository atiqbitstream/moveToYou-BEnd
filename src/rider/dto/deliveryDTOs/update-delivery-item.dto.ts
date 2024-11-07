import { PartialType } from "@nestjs/mapped-types";
import { CreateDeliveryItemDto } from "./delivery-item.dto";

export class UpdateDeliveryItemDto extends PartialType(CreateDeliveryItemDto)
{
    
}