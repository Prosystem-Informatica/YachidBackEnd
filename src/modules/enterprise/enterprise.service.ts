import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateEnterpriseDto } from './dto/enterprise.dto';
import { AddressService } from '../address/address.service';
import { BranchService } from '../branch/branch.service';
import { RevenueTaxDetailsService } from '../revenue-tax-details/revenue-tax-details.service';
import { TaxRegimeService } from '../tax-regime/tax-regime.service';
import { EnterpriseRegime } from '../tax-regime/dto/tax-regime.dto';


@Injectable()
export class EnterpriseService {
    constructor(
    @InjectRepository(Enterprise, EDatabase.YACHID) 
    private readonly enterpriseRepository: Repository<Enterprise>,
    private readonly addressService: AddressService,
    private readonly branchService: BranchService,
    private readonly revenueTaxDetailsService: RevenueTaxDetailsService,
    private readonly taxRegimeService: TaxRegimeService
) {
    }

    private readonly Logger = new Logger(EnterpriseService.name);

    async createEnterprise(createEnterpriseDto: CreateEnterpriseDto, entrepreneurId: string): Promise<any> {
        try {

            this.Logger.log(`Creating enterprise for entrepreneur ${entrepreneurId}`);

            const enterprise = this.enterpriseRepository.create({...createEnterpriseDto, entrepreneur: { id: entrepreneurId }});

            if(!enterprise) {
                throw new BadRequestException('Enterprise not created');
            }

            await this.enterpriseRepository.save(enterprise);

            this.Logger.log(`Enterprise created: ${enterprise}`);

            const address = await this.addressService.create(createEnterpriseDto.address);

            if(!address) {
                throw new BadRequestException('Address not created');
            }

            const branch = await this.branchService.createBranch({name: createEnterpriseDto.fantasy_name + ` - SEDE`}, enterprise.id, address.id);

            if(!branch) {
                throw new BadRequestException('Branch not created');
            }

            this.Logger.log(`Branch created: ${branch}`);

            const taxRegime = await this.taxRegimeService.setTaxRegime(createEnterpriseDto.tax_regime, branch.id);

            if(!taxRegime) {
                throw new BadRequestException('Tax regime not created');
            }
 
            const revenueTaxDetails = await this.revenueTaxDetailsService.setRevenueTaxDetails(createEnterpriseDto.revenueTaxDetails, branch.id, taxRegime.tax_regime);

            if(!revenueTaxDetails) {
                throw new BadRequestException('Revenue tax details not created');
            }

            this.Logger.log(`Enterprise created with branch and address successfully: ${enterprise.fantasy_name}`);
  
        } catch (e) {
            
            if(e.detail && e.detail.includes('already exists')) {
                this.Logger.error(`Error creating enterprise: ${e.message}`);
                throw new BadRequestException('Enterprise already exists');
            }
            this.Logger.error(`Error creating enterprise: ${e.message}`);
            throw e;
        }
    }


    async getEnterprisesByEntrepreneur(entrepreneurId: string): Promise<any> {
        try {
            return this.enterpriseRepository.find({ 
                where: { entrepreneur: { id: entrepreneurId } },
               
            });
        } catch (e) {
            this.Logger.error(`Error getting enterprises by entrepreneur: ${e.message}`);
            throw new BadRequestException(e.message);
        }
    }

    async getEnterpriseDetail(enterpriseId: string): Promise<any> {
        try {
            return this.enterpriseRepository.find({ 
                where: { id: enterpriseId },
                relations: ['branches', 'branches.address', 'branches.revenueTaxDetails', 'branches.taxRegime'],
            });
        } catch (e) {
            this.Logger.error(`Error getting enterprise detail: ${e.message}`);
            throw new BadRequestException(e.message);
        }
    }

}