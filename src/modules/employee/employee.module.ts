import { forwardRef, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { AuthModule } from '../auth/auth.module';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from '../../config/db/database.config';
import { UserModule } from '../user/user.module';
import { PhotosModule } from '../photos/photos.module';
import { BranchModule } from '../branch/branch.module';


@Module({
  imports: [TypeOrmModule.forFeature([Employee], EDatabase.YACHID), forwardRef(() => UserModule), forwardRef(() => PhotosModule), forwardRef(() => BranchModule)],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
