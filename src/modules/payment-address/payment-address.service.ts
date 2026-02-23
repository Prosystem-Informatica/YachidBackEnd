import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { CreatePaymentAddressDto } from './dto/payment-address.dto';
import { PaymentAddress } from './entities/payment-address.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePaymentAddressDto } from './dto/update-payment-address.dto';

@Injectable()
export class PaymentAddressService {
    
    constructor(
        @InjectRepository(PaymentAddress, EDatabase.YACHID)
        private readonly paymentAddressRepository: Repository<PaymentAddress>
    ) {}
    private readonly logger = new Logger(PaymentAddressService.name);
    async create(createPaymentAddressDto: CreatePaymentAddressDto, partnerId: string): Promise<PaymentAddress> {
        try {
            return await this.paymentAddressRepository.save({
                ...createPaymentAddressDto,
                partner: { id: partnerId },
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getMyPaymentAddress(partnerId: string): Promise<PaymentAddress> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Getting payment address for partner:${uuid}`);
            return await this.paymentAddressRepository.findOneOrFail({
                where: { partner: { id: partnerId } },
            });
        } catch (error) {
            this.logger.error(`Error getting payment address for partner :${uuid}:${error.message}`);
            throw new NotFoundException('Payment address not found');
           
        }
    }

    async updatePaymentAddress(id: string, updatePaymentAddressDto: UpdatePaymentAddressDto): Promise<void> {
        console.log(updatePaymentAddressDto);
        const uuid = uuidv4();
        try {
            this.logger.log(`Updating payment address for id:${uuid}`);
            await this.paymentAddressRepository.update(id, updatePaymentAddressDto);
        } catch (error) {
            this.logger.error(`Error updating payment address for id:${uuid}:${error.message}`);
            throw new BadRequestException(error.message);
        }
    }
}
