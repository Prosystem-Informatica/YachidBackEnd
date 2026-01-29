import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/branch.dto';

@Injectable()
export class BranchService {

    constructor(
        @InjectRepository(Branch, EDatabase.YACHID)
        private readonly branchRepository: Repository<Branch>
    ) {
    }
    private readonly logger = new Logger(BranchService.name);

    async createBranch(createBranchDto: CreateBranchDto, enterpriseId: string): Promise<Branch> {
        try {

            this.logger.log(`Creating branch for enterprise ${enterpriseId}`);

            const branch = await this.branchRepository.save({...createBranchDto, enterprise: { id: enterpriseId }});

            if(!branch) {
                throw new BadRequestException('Branch not created');
            }

            this.logger.log(`Branch created successfully`);

            return branch;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getBranchesByEnterprise(enterpriseId: string): Promise<Branch[]> {
        try {
            return this.branchRepository.find({ where: { enterprise: { id: enterpriseId } } });
        } catch (error) {
            this.logger.error(`Error getting branches by enterprise: ${error.message}`);
            throw new BadRequestException(error.message);
        }
    }
}
