export class CreateProductDto
{
    name:string;
    organizationId:number;
}


export class CreateProductsDto
{
    products:CreateProductDto[];
}