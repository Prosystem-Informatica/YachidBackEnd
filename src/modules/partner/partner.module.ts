import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Partner } from './entity/partner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { AddressModule } from '../address/address.module';
import { CarrierPartnerModule } from 'src/modules/carrier-partner/carrier-partner.module';
import { PaymentAddressModule } from '../payment-address/payment-address.module';
import { BranchModule } from '../branch/branch.module';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner], EDatabase.YACHID), AddressModule, CarrierPartnerModule, PaymentAddressModule, BranchModule, EmployeeModule],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {
  
}
