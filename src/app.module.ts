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
import { PartnerModule } from './modules/partner/partner.module';
import { PaymentAddressModule } from './modules/payment-address/payment-address.module';
import { CarrierModule } from './modules/carrier/carrier.module';
import { CarrierPartnerModule } from './modules/carrier-partner/carrier-partner.module';
import { PartnerCreditConfigModule } from './modules/partner-credit-config/partner-credit-config.module';
import { DeliveryAddressModule } from './modules/delivery-address/delivery-address.module';
import { AccountsPayableModule } from './modules/accounts-payable/accounts-payable.module';
import { AccountsReceivableModule } from './modules/accounts-receivable/accounts-receivable.module';
import { ProductModule } from './modules/product/product.module';
import { RepresentativeModule } from './modules/representative/representative.module';
import { BankModule } from './modules/bank/bank.module';
import { GroupModule } from './modules/group/group.module';


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
    PartnerModule,
    PaymentAddressModule,
    CarrierModule,
    CarrierPartnerModule,
    PartnerCreditConfigModule,
    AccountsPayableModule,
    DeliveryAddressModule,
    AccountsReceivableModule,
    ProductModule,
    RepresentativeModule,
    BankModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
