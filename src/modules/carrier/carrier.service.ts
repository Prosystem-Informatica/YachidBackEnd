import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/carrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrier } from './entities/carrier.entity';
import { Repository } from 'typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { CarrierPartnerService } from 'src/modules/carrier-partner/carrier-partner.service';

@Injectable()
export class CarrierService {

    constructor(
    @InjectRepository(Carrier, EDatabase.YACHID) 
    private readonly carrierRepository: Repository<Carrier>,
    @Inject(forwardRef(() => CarrierPartnerService))
    private readonly carrierPartnerService: CarrierPartnerService,
) {}

    async create(createCarrierDto: CreateCarrierDto) {
        return this.carrierRepository.save(createCarrierDto);
    }

    async findAll() {
        return await this.carrierRepository.find();
    }

   async findOne(id: string) {
    return await this.carrierRepository.findOne({ where: { id } });
   }

    async addPartnerToCarrier(carrierId: string, partnerId: string) {
        return await this.carrierPartnerService.addPartnerToCarrier(carrierId, partnerId);
    }


}
