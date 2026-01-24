import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeModule } from '../employee/employee.module';
import { forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => EmployeeModule)],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService]
})
export class AuthModule {}
