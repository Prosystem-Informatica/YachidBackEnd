import { forwardRef, Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { EDatabase } from 'src/config/db/database.config';
import { EmployeeModule } from '../employee/employee.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([Branch], EDatabase.YACHID), forwardRef(() => EmployeeModule),forwardRef(() => AddressModule) ],
  providers: [BranchService],
  controllers: [BranchController],
  exports: [BranchService]
})
export class BranchModule {}
