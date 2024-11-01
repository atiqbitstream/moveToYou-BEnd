import { PartialType } from '@nestjs/mapped-types';
import { CreateRiderDto } from './create-rider.dto';

export class UpdateRiderDto extends PartialType(CreateRiderDto) {

    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    sector?: string;
    street?: string;
    cnicNumber?:string;
}
