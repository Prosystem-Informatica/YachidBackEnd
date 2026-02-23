import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { AddressModule } from '../address/address.module';
import { Representative } from './entities/representative.entity';
import { RepresentativeController } from './representative.controller';
import { RepresentativeService } from './representative.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Representative], EDatabase.YACHID),
    AddressModule,
  ],
  controllers: [RepresentativeController],
  providers: [RepresentativeService],
  exports: [RepresentativeService],
})
export class RepresentativeModule {}
