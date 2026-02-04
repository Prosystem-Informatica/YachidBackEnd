import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RevenueTaxDetails } from './entities/revenue-tax-details.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { RevenueTaxDetailsDto } from './dto/revenue-tax-details.dto';
import { EnterpriseRegime } from '../tax-regime/dto/tax-regime.dto';
import { RevenueTaxDetailsSimpleDto } from './dto/revenue-tax-details-simple.dto';
import { validateAndToPlain } from 'src/config/validate-and-transform';
import { RevenueTaxDetailsNormaAndOverRevenuelDto } from './dto/revenue-ta-details-normal.dto';

@Injectable()
export class RevenueTaxDetailsService {

    constructor(
        @InjectRepository(RevenueTaxDetails, EDatabase.YACHID)
        private revenueTaxDetailsRepository: Repository<RevenueTaxDetails>,
    ) {}

    private readonly logger = new Logger(RevenueTaxDetailsService.name);

    async setRevenueTaxDetails(revenueTaxDetailsDto: RevenueTaxDetailsDto, branchId: string, regimeType: EnterpriseRegime) {

        try {
            if(regimeType === EnterpriseRegime.SIMPLE ) {
                validateAndToPlain(RevenueTaxDetailsSimpleDto, revenueTaxDetailsDto);
            } else {
                validateAndToPlain(RevenueTaxDetailsNormaAndOverRevenuelDto, revenueTaxDetailsDto);
            } 

            const revenueTaxDetailsEntity = this.revenueTaxDetailsRepository.create({
                ...revenueTaxDetailsDto,
                branch: {
                    id: branchId
                }
            });

            if(!revenueTaxDetailsDto) {
                throw new BadRequestException('Revenue tax details not found');
            }
            return await this.revenueTaxDetailsRepository.save(revenueTaxDetailsEntity)

        }catch(error) {
            this.logger.error(error);
            throw error;
        }

    }   
}
