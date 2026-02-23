import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/carrier.dto';

@Controller('carriers')
export class CarrierController {

    constructor(private readonly carrierService: CarrierService) {}


    @Post()
    create(@Body() createCarrierDto: CreateCarrierDto) {
        return this.carrierService.create(createCarrierDto);
    }

    @Get()
    findAll() {
        return this.carrierService.findAll();
    }

    @Post(':carrierId/partner/:partnerId')
    addPartnerToCarrier(@Param('carrierId') carrierId: string, @Param('partnerId') partnerId: string) {
        return this.carrierService.addPartnerToCarrier(carrierId, partnerId);
    }
}
