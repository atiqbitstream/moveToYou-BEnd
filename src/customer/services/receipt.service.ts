import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Receipt } from "../entities/receipt.entity";
import { Repository } from "typeorm";
import { DailyDelivery } from "src/rider/entities/dailyDelivery.entity";
import { DeliveryItem } from "src/rider/entities/deliveryItem.entity";

@Injectable()
export class ReceiptService
{

    constructor(
        @InjectRepository(Receipt)
        private receiptRepository:Repository<Receipt>,
        @InjectRepository(DailyDelivery)
        private dailyDeliveryRepository: Repository<DailyDelivery>,
        @InjectRepository(DeliveryItem)
        private deliveryItemRepository:Repository<DeliveryItem>
    ){}

    async createOrUpdateReceipt(dailyDeliveryId:number)
    {
        const deliveryItems = await this.deliveryItemRepository.find({
            where:{dailyDeliveryId},
            relations:['product']
        })

        const productNames = deliveryItems.map(item=>
            item.product?.name || 'Unknown product'
        );

        const existingReceipt = await this.receiptRepository.findOne({
            where:{dailyDelivery:{id:dailyDeliveryId}}
        });

        if(existingReceipt)
        {
            existingReceipt.receiptsItem=productNames;
            return this.receiptRepository.save(existingReceipt);
        }

        const newReceipt = this.receiptRepository.create({
            receiptsItem:productNames,
            dailyDelivery: {id:dailyDeliveryId}
        });

        return this.receiptRepository.save(newReceipt);
    }

}