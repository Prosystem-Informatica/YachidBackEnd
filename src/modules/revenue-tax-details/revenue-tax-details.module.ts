import { Module } from '@nestjs/common';
import { RevenueTaxDetailsService } from './revenue-tax-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueTaxDetails } from './entities/revenue-tax-details.entity';
import { EDatabase } from 'src/config/db/database.config';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueTaxDetails], EDatabase.YACHID)],
  providers: [RevenueTaxDetailsService],
  exports: [RevenueTaxDetailsService],
 
})
export class RevenueTaxDetailsModule {}
