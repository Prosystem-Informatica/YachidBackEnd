import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { EDatabase } from 'src/config/db/database.config';
import { CarrierPartner } from './entities/carrier-partner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CarrierService } from 'src/modules/carrier/carrier.service';
import { PartnerService } from 'src/modules/partner/partner.service';

@Injectable()
export class CarrierPartnerService {

    constructor(
    @InjectRepository(CarrierPartner, EDatabase.YACHID)
    private readonly carrierPartnerRepository: Repository<CarrierPartner>,
    @Inject(forwardRef(() => CarrierService))
    private readonly carrierService: CarrierService,
    private readonly partnerService: PartnerService,
) {}

    async addPartnerToCarrier(carrierId: string, partnerId: string) {
        try{
            const carrier = await this.carrierService.findOne(carrierId);
            if(!carrier) {
                throw new BadRequestException('Carrier not found');
            }
            const partner = await this.partnerService.findOne(partnerId);
            if(!partner) {
                throw new BadRequestException('Partner not found');
            }
            const carrierPartner = this.carrierPartnerRepository.create({ carrier: { id: carrierId }, partner: { id: partnerId } });
            return await this.carrierPartnerRepository.save(carrierPartner);

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll() {
        try{
            return await this.carrierPartnerRepository.find();
        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}
