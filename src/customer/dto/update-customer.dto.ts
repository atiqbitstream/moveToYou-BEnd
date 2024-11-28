import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

  @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    sector?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    googlePin?: string;

    @IsOptional()
    @IsString()
    homePicture?: string;

    @IsOptional()
    @IsString()
    organization?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    contract?: string;

    @IsOptional()
    @IsString()
    organizationId?: number;

}

