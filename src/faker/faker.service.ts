import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/services/customer.service';

@Injectable()
export class FakerService {

    constructor(private customerService:CustomerService){}
    
    async createRandomCustomers() {
        const CustomersEmaan = await Promise.all([
          this.customerService.create({
            firstName: 'Customer1',
            lastName: 'Emaan',
            phoneNumber: '0301123456',
            address: 'Sector A',
            sector: 'I-10',
            street: 'Street 1',
            googlePin: 'https://maps.google.com/?q=I-10+Street+1',
            homePicture: 'https://example.com/home1.jpg',
            organization: 'emaanDairy',
            organizationId: 1,
            status: true,
            contract: 'Emaan Dairy Contract A'
          }),
          this.customerService.create({
            firstName: 'Customer2',
            lastName: 'Emaan',
            phoneNumber: '0312123456',
            address: 'Sector B',
            sector: 'G-9',
            street: 'Street 2',
            googlePin: 'https://maps.google.com/?q=G-9+Street+2',
            homePicture: 'https://example.com/home2.jpg',
            organization: 'emaanDairy',
            organizationId: 1,
            status: true,
            contract: 'Emaan Dairy Contract B'
          }),
          this.customerService.create({
            firstName: 'Customer3',
            lastName: 'Emaan',
            phoneNumber: '0323123456',
            address: 'Sector C',
            sector: 'G-8',
            street: 'Street 3',
            googlePin: 'https://maps.google.com/?q=G-8+Street+3',
            homePicture: 'https://example.com/home3.jpg',
            organization: 'emaanDairy',
            organizationId: 1,
            status: true,
            contract: 'Emaan Dairy Contract C'
          })
        ]);
      
        const CustomersNew = await Promise.all([
          this.customerService.create({
            firstName: 'Customer1',
            lastName: 'New',
            phoneNumber: '0344123456',
            address: 'Sector D',
            sector: 'H-11',
            street: 'Street 4',
            googlePin: 'https://maps.google.com/?q=H-11+Street+4',
            homePicture: 'https://example.com/home4.jpg',
            organization: 'newDairy',
            organizationId: 2,
            status: true,
            contract: 'New Dairy Contract A'
          }),
          this.customerService.create({
            firstName: 'Customer2',
            lastName: 'New',
            phoneNumber: '0355123456',
            address: 'Sector E',
            sector: 'G-10',
            street: 'Street 5',
            googlePin: 'https://maps.google.com/?q=G-10+Street+5',
            homePicture: 'https://example.com/home5.jpg',
            organization: 'newDairy',
            organizationId: 2,
            status: true,
            contract: 'New Dairy Contract B'
          }),
          this.customerService.create({
            firstName: 'Customer3',
            lastName: 'New',
            phoneNumber: '0366123456',
            address: 'Sector F',
            sector: 'G-7',
            street: 'Street 6',
            googlePin: 'https://maps.google.com/?q=G-7+Street+6',
            homePicture: 'https://example.com/home6.jpg',
            organization: 'newDairy',
            organizationId: 2,
            status: true,
            contract: 'New Dairy Contract C'
          })
        ]);
      
        const CustomersFresh = await Promise.all([
          this.customerService.create({
            firstName: 'Customer1',
            lastName: 'Fresh',
            phoneNumber: '0377123456',
            address: 'Sector G',
            sector: 'F-11',
            street: 'Street 7',
            googlePin: 'https://maps.google.com/?q=F-11+Street+7',
            homePicture: 'https://example.com/home7.jpg',
            organization: 'freshDairy',
            organizationId: 3,
            status: true,
            contract: 'Fresh Dairy Contract A'
          }),
          this.customerService.create({
            firstName: 'Customer2',
            lastName: 'Fresh',
            phoneNumber: '0388123456',
            address: 'Sector H',
            sector: 'H-8',
            street: 'Street 8',
            googlePin: 'https://maps.google.com/?q=H-8+Street+8',
            homePicture: 'https://example.com/home8.jpg',
            organization: 'freshDairy',
            organizationId: 3,
            status: true,
            contract: 'Fresh Dairy Contract B'
          }),
          this.customerService.create({
            firstName: 'Customer3',
            lastName: 'Fresh',
            phoneNumber: '0399123456',
            address: 'Sector I',
            sector: 'H-7',
            street: 'Street 9',
            googlePin: 'https://maps.google.com/?q=H-7+Street+9',
            homePicture: 'https://example.com/home9.jpg',
            organization: 'freshDairy',
            organizationId: 3,
            status: true,
            contract: 'Fresh Dairy Contract C'
          })
        ]);
      
        return {
          CustomersEmaan,
          CustomersNew,
          CustomersFresh
        };
      }
      
}
