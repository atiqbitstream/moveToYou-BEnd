export class CreateAreaDto
{
    name:string;
    address:string;
    googlePins : {
        latitude:string;
        longitude:string;
    }
    ZoneId:number;
}