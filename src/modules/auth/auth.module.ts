import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '../employee/employee.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EntrepreneurModule } from '../entrepreneur/entrepreneur.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    forwardRef(() => EmployeeModule), 
    forwardRef(() => EntrepreneurModule), 
    forwardRef(() => UserModule),
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    global: true,
    signOptions: { expiresIn: '24h' },
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
