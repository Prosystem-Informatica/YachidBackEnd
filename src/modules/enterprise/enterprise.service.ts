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

    async createEnterprise(createEnterpriseDto: CreateEnterpriseDto): Promise<any> {
        try {

            console.log(createEnterpriseDto);

            

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

            return this.enterpriseRepository.save(enterprise);

        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
