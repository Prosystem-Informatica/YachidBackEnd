import { Module } from '@nestjs/common';
import { AccountsReceivableService } from './accounts-receivable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsReceivable } from './entities/accounts-receivable';
import { EDatabase } from 'src/config/db/database.config';
import { AccountsReceivableController } from './accounts-receivable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsReceivable], EDatabase.YACHID)],
  controllers: [AccountsReceivableController],
  providers: [AccountsReceivableService],
})
export class AccountsReceivableModule {}
