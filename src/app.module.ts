import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule, dbYachidConfig } from './config/db/database.config';
import { AddressModule } from './modules/address/address.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { RevenueTaxDetailsModule } from './modules/revenue-tax-details/revenue-tax-details.module';
import { PhotosModule } from './modules/photos/photos.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { EntrepreneurModule } from './modules/entrepreneur/entrepreneur.module';
import { UserModule } from './modules/user/user.module';
import { TaxRegimeModule } from './modules/tax-regime/tax-regime.module';
import { BranchModule } from './modules/branch/branch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [dbYachidConfig],
    }),
    ...DatabaseConfigModule,
 
    AuthModule,
    AddressModule,
    AccountingModule,
    RevenueTaxDetailsModule,
    EnterpriseModule,
    PhotosModule,
    EntrepreneurModule,
    UserModule,
    TaxRegimeModule,
    forwardRef(() => BranchModule),
    forwardRef(() => EmployeeModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
