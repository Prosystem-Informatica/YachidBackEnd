import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PartnerDto } from './dto/partner.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './entity/partner.entity';
import { EDatabase } from 'src/config/db/database.config';
import { PartnerType } from 'src/core/enum/enums';
import { AddressService } from '../address/address.service';
import { PaymentAddressService } from '../payment-address/payment-address.service';
import { v4 as uuidv4 } from 'uuid';

import { ListPartnersDto } from './dto/list-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnerService {


    constructor(@InjectRepository(Partner, EDatabase.YACHID) 
    private readonly partnerRepository: Repository<Partner>,
    private readonly addressService: AddressService, 
    private readonly paymentAddressService: PaymentAddressService) {
    
    }
    private readonly logger = new Logger(PartnerService.name);

    
    async createPartner(partnerType: PartnerType, partnerDto: PartnerDto) {
        const uuid = uuidv4();
        try {
            
        this.logger.log(`Creating partner ${partnerType}:${uuid}`);

        if(!(partnerType === PartnerType.FORNECEDOR || partnerType === PartnerType.CLIENTE)) {
            throw new BadRequestException('Partner type not found');    
        }
        const address = await this.addressService.create(partnerDto.address);

        this.logger.log(`Address created:${uuid}`);

        if(!address) {
            throw new BadRequestException('Address not created');
        }
  
        const { groupId, address: _address, payment_address: _paymentAddress, ...partnerData } = partnerDto;
        const partner = await this.partnerRepository.save({
            ...partnerData,
            address: { id: address.id },
            group: { id: groupId },
            partner_type: partnerType,
        });

        this.logger.log(`Partner created:${uuid}`);

        const paymentAddress = await this.paymentAddressService.create({
            ...partnerDto.payment_address,
        }, partner.id);

        this.logger.log(`Payment address created:${uuid}`);

        if(!paymentAddress) {
            throw new BadRequestException('Payment address not created');
        }

        } catch (error) {
            this.logger.error(`Error creating partner ${partnerType}:${uuid}:${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            return await this.partnerRepository.findOne({ where: { id } });
        }catch(error) {
            this.logger.error(`Error getting partner: ${error.message}`);
            throw new BadRequestException(error.message);
        }
        }


    async getPartners(listPartnersDto: ListPartnersDto): Promise<{ partners: Partner[], total: number }> {
        const uuid = uuidv4();
        try {
            if (listPartnersDto.groupId) {
                return await this.getPartnersByGroup(listPartnersDto.groupId);
            }
            throw new BadRequestException('groupId é obrigatório');

        } catch (error) {
            this.logger.error(`Error getting partners:${uuid}:${error.message}`);
            throw new BadRequestException(error.message ?? 'Error getting partners');
        }
    }

    async getPartnersByGroup(groupId: string): Promise<{ partners: Partner[], total: number }> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Getting partners by group:${uuid}`);
            const [partners, total] = await this.partnerRepository.findAndCount({
                where: { group: { id: groupId } },
                relations: ['address'],
            });
            return { partners, total };
        } catch (error) {
            this.logger.error(`Error getting partners by group:${uuid}:${error.message}`);
            throw new BadRequestException(error.message);
        }
    }


    async getPartnerDetails(partnerId: string): Promise<Partner> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Getting partner details:${uuid}`);
            const partner = await this.partnerRepository.findOneOrFail({ where: { id: partnerId }, relations: ['address', 'deliveryAddresses'] });
            console.log('partner', partner);
            return partner;
        }catch(error) {
            this.logger.error(`Error getting partner details:${uuid}:${error.message}`);
            throw new BadRequestException(error.message ?? 'Error getting partner details');
        }
    }


    async updatePartner(partnerId: string, updatePartnerDto: UpdatePartnerDto): Promise<void> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Updating partner:${uuid}`);
            await this.partnerRepository.findOneOrFail({ where: { id: partnerId } });

            const { groupId, ...rest } = updatePartnerDto;
            const updateData: Record<string, unknown> = { ...rest };
            if (groupId !== undefined) {
                updateData.group = { id: groupId };
            }

            await this.partnerRepository.update(partnerId, updateData);

        } catch (error) {
            this.logger.error(`Error updating partner:${uuid}:${error.message}`);
            throw new BadRequestException(error.message ?? 'Error updating partner');
        }
    }
}
