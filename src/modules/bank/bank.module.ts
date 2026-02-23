import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Bank } from './entities/bank.entity';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bank], EDatabase.YACHID)],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
