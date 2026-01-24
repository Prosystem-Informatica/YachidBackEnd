import { forwardRef, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { AuthModule } from '../auth/auth.module';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from '../../config/db/database.config';


@Module({
  imports: [TypeOrmModule.forFeature([Employee], EDatabase.YACHID), forwardRef(() => AuthModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
