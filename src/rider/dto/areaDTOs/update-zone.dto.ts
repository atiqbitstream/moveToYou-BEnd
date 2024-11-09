import { PartialType } from "@nestjs/mapped-types";
import { CreateZoneDto } from "./createZone.dto";

export class UpdateZoneDto extends PartialType(CreateZoneDto)
{
    
}