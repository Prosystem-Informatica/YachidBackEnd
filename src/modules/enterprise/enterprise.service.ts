import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateEnterpriseDto } from './dto/enterprise.dto';
import { AddressService } from '../address/address.service';

@Injectable()
export class EnterpriseService {
    constructor(
    @InjectRepository(Enterprise, EDatabase.YACHID) 
    private readonly enterpriseRepository: Repository<Enterprise>,
    private readonly addressService: AddressService
) {
    }

    async createEnterprise(createEnterpriseDto: CreateEnterpriseDto, entrepreneurId: string): Promise<any> {
        try {

            const address = await this.addressService.create(createEnterpriseDto.address);

            if(!address) {
                throw new BadRequestException('Address not created');
            }

            const enterprise = this.enterpriseRepository.create({
                ...createEnterpriseDto,
                address: address
            });

            if(!enterprise) {
                throw new BadRequestException('Enterprise not created');
            }

            return this.enterpriseRepository.save({...enterprise, entrepreneur: { id: entrepreneurId }});

        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }


    async getEnterprisesByEntrepreneur(entrepreneurId: string): Promise<any> {
        try {
            return this.enterpriseRepository.find({ 
                where: { entrepreneur: { id: entrepreneurId } },
                relations: ['address']
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

}