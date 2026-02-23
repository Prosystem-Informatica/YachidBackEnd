import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { PartnerCreditConfig } from './entities/partner-credit-config.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreatePartnerCreditConfigDto } from './dto/partner-credit-config.dto';
import { UpdatePartnerCreditConfigDto } from './dto/update-partner-credit-config.dto';

@Injectable()
export class PartnerCreditConfigService {


    constructor(@InjectRepository(PartnerCreditConfig, EDatabase.YACHID)
    private readonly partnerCreditConfigRepository: Repository<PartnerCreditConfig>) {}
    private readonly logger = new Logger(PartnerCreditConfigService.name);


    async getPartnerCreditConfig(partnerId: string):Promise<PartnerCreditConfig> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Getting partner credit config for partner ${partnerId}:${uuid}`);

            const partnerCreditConfig = await this.partnerCreditConfigRepository.findOne({ where: { partner: { id: partnerId } } });

            if(!partnerCreditConfig) {
                throw new NotFoundException('Partner credit config not found');
            }
            this.logger.log(`Partner credit config found: ${uuid}`);
            return partnerCreditConfig;

        }catch(error) {
            if(error instanceof NotFoundException) {
                throw error;
            }
            this.logger.error(`Error getting partner credit config: ${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async createPartnerCreditConfig(partnerId: string, createPartnerCreditConfigDto: CreatePartnerCreditConfigDto): Promise<PartnerCreditConfig> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Creating partner credit config for partner ${partnerId}:${uuid}`);
            const dto = { ...createPartnerCreditConfigDto };

            const partnerCreditConfig = await this.partnerCreditConfigRepository.save({ ...dto, partner: { id: partnerId } });
            return partnerCreditConfig;
        }catch(error) {
            this.logger.error(`Error creating partner credit config: ${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async updatePartnerCreditConfig(partnerId: string, updatePartnerCreditConfigDto: UpdatePartnerCreditConfigDto): Promise<PartnerCreditConfig> {
        const uuid = uuidv4();
        try {
            this.logger.log(`Updating partner credit config for partner ${partnerId}:${uuid}`);
            const existing = await this.partnerCreditConfigRepository.findOne({ where: { partner: { id: partnerId } } });
            if (!existing) {
                throw new NotFoundException('Partner credit config not found');
            }
            const dto = { ...updatePartnerCreditConfigDto } as any;
            if (dto.date !== undefined) {
                dto.date = typeof dto.date === 'string' ? new Date(dto.date) : dto.date;
            }
            Object.assign(existing, dto);
            return this.partnerCreditConfigRepository.save(existing);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            this.logger.error(`Error updating partner credit config: ${error.message}`);
            throw new BadRequestException(error.message);
        }
    }
}
