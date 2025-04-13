export class CreateProductDto
{
    name:string;
    price:number;
    organizationId:number;
}


export class CreateProductsDto
{
    products:CreateProductDto[];
}