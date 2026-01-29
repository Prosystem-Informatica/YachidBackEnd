import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateEnterpriseDto } from './dto/enterprise.dto';
import { AddressService } from '../address/address.service';
import { BranchService } from '../branch/branch.service';

@Injectable()
export class EnterpriseService {
    constructor(
    @InjectRepository(Enterprise, EDatabase.YACHID) 
    private readonly enterpriseRepository: Repository<Enterprise>,
    private readonly addressService: AddressService,
    private readonly branchService: BranchService
) {
    }

    private readonly Logger = new Logger(EnterpriseService.name);

    async createEnterprise(createEnterpriseDto: CreateEnterpriseDto, entrepreneurId: string): Promise<any> {
        try {

            this.Logger.log(`Creating enterprise for entrepreneur ${entrepreneurId}`);

            const enterprise = await this.enterpriseRepository.save({...createEnterpriseDto, entrepreneur: { id: entrepreneurId }});

            if(!enterprise) {
                throw new BadRequestException('Enterprise not created');
            }

            this.Logger.log(`Enterprise created: ${enterprise}`);

            const branch = await this.branchService.createBranch({name: createEnterpriseDto.fantasy_name + ` - SEDE`}, enterprise.id);

            if(!branch) {
                throw new BadRequestException('Branch not created');
            }

            this.Logger.log(`Branch created: ${branch}`);

            const address = await this.addressService.create(createEnterpriseDto.address, branch.id);

            if(!address) {
                throw new BadRequestException('Address not created');
            }

            this.Logger.log(`Enterprise created with branch and address successfully: ${enterprise}`);


        } catch (e) {
            this.Logger.error(`Error creating enterprise: ${e.message}`);
            throw new BadRequestException(e.message);
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

}