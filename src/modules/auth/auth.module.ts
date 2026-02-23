import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmployeeModule } from '../employee/employee.module';
import { forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EntrepreneurModule } from '../entrepreneur/entrepreneur.module';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    forwardRef(() => EmployeeModule), 
    forwardRef(() => EntrepreneurModule), 
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
    global: true,
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
    }),
    inject: [ConfigService],
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
