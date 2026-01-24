import { Module } from '@nestjs/common';
import { RevenueTaxDetailsService } from './revenue-tax-details.service';

@Module({
  providers: [RevenueTaxDetailsService]
})
export class RevenueTaxDetailsModule {}
