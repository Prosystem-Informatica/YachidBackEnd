import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntrepreneurModule } from '../entrepreneur/entrepreneur.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => EmployeeModule), forwardRef(() => EntrepreneurModule), forwardRef(() => UserModule)],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService]
})
export class AuthModule {}
