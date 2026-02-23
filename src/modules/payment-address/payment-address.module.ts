import { Module } from '@nestjs/common';
import { PaymentAddressService } from './payment-address.service';
import { PaymentAddressController } from './payment-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAddress } from './entities/payment-address.entity';
import { EDatabase } from 'src/config/db/database.config';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentAddress], EDatabase.YACHID)],
  providers: [PaymentAddressService],
  controllers: [PaymentAddressController],
  exports: [PaymentAddressService]
})
export class PaymentAddressModule {}
