import { forwardRef, Module } from '@nestjs/common';
import { CarrierPartnerService } from './carrier-partner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierPartner } from './entities/carrier-partner.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CarrierModule } from 'src/modules/carrier/carrier.module';
import { PartnerModule } from 'src/modules/partner/partner.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarrierPartner], EDatabase.YACHID),
    forwardRef(() => CarrierModule),
    forwardRef(() => PartnerModule),
  ],
  providers: [CarrierPartnerService],
  exports: [CarrierPartnerService]
})
export class CarrierPartnerModule {}
