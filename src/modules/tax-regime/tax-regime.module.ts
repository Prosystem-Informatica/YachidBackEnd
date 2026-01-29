import { Module } from '@nestjs/common';
import { TaxRegimeService } from './tax-regime.service';
import { TaxRegimeController } from './tax-regime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { TaxRegime } from './entities/tax-regime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRegime], EDatabase.YACHID)],
  providers: [TaxRegimeService],
  controllers: [TaxRegimeController],
  exports: [TaxRegimeService]
})
export class TaxRegimeModule {}
