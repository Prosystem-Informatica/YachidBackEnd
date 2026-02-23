import { Module } from '@nestjs/common';
import { PartnerCreditConfigService } from './partner-credit-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { PartnerCreditConfig } from './entities/partner-credit-config.entity';
import { PartnerCreditConfigController } from './partner-credit-config.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerCreditConfig], EDatabase.YACHID)],
  controllers: [PartnerCreditConfigController],
  providers: [PartnerCreditConfigService]
})
export class PartnerCreditConfigModule {}
