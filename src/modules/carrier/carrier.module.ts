import { forwardRef, Module } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CarrierController } from './carrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrier } from './entities/carrier.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CarrierPartnerModule } from 'src/modules/carrier-partner/carrier-partner.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier], EDatabase.YACHID), forwardRef(() => CarrierPartnerModule)],
  providers: [CarrierService],
  controllers: [CarrierController],
  exports: [CarrierService]
})
export class CarrierModule {}
