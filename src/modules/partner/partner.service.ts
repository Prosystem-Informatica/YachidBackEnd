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
  
        const partner = await this.partnerRepository.save({
            ...partnerDto,
            address: { id: address.id },
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
            if(listPartnersDto.branchId) {
                 return await this.getPartnersByBranch(listPartnersDto.branchId);
            }else if(listPartnersDto.enterpriseId) {
                return await this.getPartnersByEnterprise(listPartnersDto.enterpriseId);
            }
            console.log('listPartnersDto', listPartnersDto);
            throw new BadRequestException('Branch or enterprise not found');

        }catch(error) {
            this.logger.error(`Error getting partners:${uuid}:${error.message}`);
            console.log('error', error);
            throw new BadRequestException(error.message ?? 'Error getting partners');
        }
    }
    


    async getPartnersByBranch(branchId: string): Promise<{ partners: Partner[], total: number }> {
        const uuid = uuidv4();
        try {
           
            this.logger.log(`Getting partners by branch:${uuid}`);

            const [partners, total] = await this.partnerRepository.findAndCount({ where: { branch: { id: branchId }}});
            return { partners, total };

        }catch(error) {
            this.logger.error(`Error getting partners by branch:${uuid}:${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async getPartnersByEnterprise(enterpriseId: string): Promise<{ partners: any[], total: number }> {
        const uuid = uuidv4();
        try {
            
            const queryBuilder = this.partnerRepository.createQueryBuilder('partner');
            queryBuilder.leftJoin('partner.branch', 'branch');
            queryBuilder.leftJoin('branch.enterprise', 'enterprise');
            queryBuilder.leftJoin('partner.address', 'address');
            queryBuilder.where('enterprise.id = :enterpriseId', { enterpriseId });
            queryBuilder.select([
                'partner.id',
                'partner.name',
                'partner.codigo',
                'partner.document',
                'partner.fantasy_name',
                'partner.main_phone',
                'address.cep',
                'address.city',
                'address.uf',
                'partner.status',
            ]);
            const partners = await queryBuilder.getRawMany();
            console.log('partners', partners);
            
        return {
            partners: partners.map((partner: any) => ({
                id: partner.partner_id,
                name: partner.partner_name,
                document: partner.partner_document,
                fantasy_name: partner.partner_fantasy_name,
                main_phone: partner.partner_main_phone,
                cep: partner.address_cep,
                city: partner.address_city,
                uf: partner.address_uf,
                status: partner.partner_status,
                codigo: partner.partner_codigo,
            })),
            total: partners.length,
        }
        }catch(error) {
            this.logger.error(`Error getting partners by enterprise:${enterpriseId}:${uuid}:${error.message}`);
            throw new BadRequestException(error.message ?? 'Error getting partners by enterprise');
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
             
            await this.partnerRepository.update(partnerId, {
                ...updatePartnerDto,
            });

        }catch(error) {
            this.logger.error(`Error updating partner:${uuid}:${error.message}`);
            throw new BadRequestException(error.message ?? 'Error updating partner');
        }
    }
}
