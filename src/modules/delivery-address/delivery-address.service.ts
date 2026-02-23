import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { CreateDeliveryAddressDto } from './dto/delivery-address.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';

@Injectable()
export class DeliveryAddressService {
    
    constructor(
        @InjectRepository(DeliveryAddress, EDatabase.YACHID)
        private readonly deliveryAddressRepository: Repository<DeliveryAddress>
    ) {}

    private readonly logger = new Logger(DeliveryAddressService.name);

    async getDeliveryAddressByPartnerId(partnerId: string): Promise<DeliveryAddress[]> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Getting delivery address by partner: ${partnerId}:${uuid}`);
            return await this.deliveryAddressRepository.find({ where: { partner: { id: partnerId } } });
        } catch (error) {
            this.logger.error(`Error getting delivery address by partner:${uuid}:${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async createDeliveryAddress(partnerId: string, createDeliveryAddressDto: CreateDeliveryAddressDto): Promise<void> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Creating delivery address for partner ${partnerId}:${uuid}`);
            await this.deliveryAddressRepository.save({ ...createDeliveryAddressDto, partner: { id: partnerId } });
        } catch (error) {
            this.logger.error(`Error creating delivery address: ${error.message}:${uuid}`);
            throw new BadRequestException(error.message);
        }
    }

    async updateDeliveryAddress(deliveryAddressId: string, updateDeliveryAddressDto: UpdateDeliveryAddressDto): Promise<void> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Updating delivery address: ${deliveryAddressId}:${uuid}`);
            await this.deliveryAddressRepository.update(deliveryAddressId, updateDeliveryAddressDto);
        } catch (error) {
            this.logger.error(`Error updating delivery address: ${error.message}:${uuid}`);
            throw new BadRequestException(error.message);
        }
    }
}
