import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { AccountsPayable } from './entities/accounts-payable.entity';
import { AccountsPayableService } from './accounts-payable.service';
import { AccountsPayableController } from './accounts-payable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsPayable], EDatabase.YACHID)],
  controllers: [AccountsPayableController],
  providers: [AccountsPayableService],
})
export class AccountsPayableModule {}
