export class CreateCustomerDto {

  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  sector: string;
  street: string;
  googlePin: {latitude:number, longitude:number};
  homePicture: string;
  organization: string;
  organizationId:number
  status: boolean;
  contract: string;

}
