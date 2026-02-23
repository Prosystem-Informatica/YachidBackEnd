import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryAddress } from './entities/delivery-address.entity';
import { EDatabase } from 'src/config/db/database.config';
import { DeliveryAddressController } from './delivery-address.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryAddress], EDatabase.YACHID)],
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
  exports: [DeliveryAddressService]
})
export class DeliveryAddressModule {}
