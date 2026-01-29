import { forwardRef, Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { EDatabase } from 'src/config/db/database.config';
import { EnterpriseModule } from '../enterprise/enterprise.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address], EDatabase.YACHID)],
  providers: [AddressService],
  exports: [AddressService]
})
export class AddressModule {}
