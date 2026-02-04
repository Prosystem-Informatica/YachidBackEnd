import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { AddressModule } from '../address/address.module';
import { Enterprise } from './entities/enterprise.entity';
import { EDatabase } from '../../config/db/database.config';
import { BranchModule } from '../branch/branch.module';
import { RevenueTaxDetailsModule } from '../revenue-tax-details/revenue-tax-details.module';
import { TaxRegimeModule } from '../tax-regime/tax-regime.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enterprise], EDatabase.YACHID),
    forwardRef(() => AddressModule),
    forwardRef(() => BranchModule),
    forwardRef(() => RevenueTaxDetailsModule),
    forwardRef(() => TaxRegimeModule)
  ],
  controllers: [EnterpriseController],
  providers: [EnterpriseService]
})
export class EnterpriseModule {}
