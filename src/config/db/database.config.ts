import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Employee } from "src/modules/employee/entities/employee.entity";
import { Enterprise } from "src/modules/enterprise/entities/enterprise.entity";
import { Address } from "src/modules/address/entities/address.entity";
import { Accounting } from "src/modules/accounting/entities/accounting.entity";
import { RevenueTaxDetails } from "src/modules/revenue-tax-details/entities/revenue-tax-details.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";
import { Entrepreneur } from "src/modules/entrepreneur/entities/entrepreneur.entity";
import { User } from "src/modules/user/entities/user.entity";
import { TaxRegime } from "src/modules/tax-regime/entities/tax-regime.entity";
import { Branch } from "src/modules/branch/entities/branch.entity";
import { Partner } from "src/modules/partner/entity/partner.entity";
import { PaymentAddress } from "src/modules/payment-address/entities/payment-address.entity";
import { Carrier } from "src/modules/carrier/entities/carrier.entity";
import { CarrierPartner } from "src/modules/carrier-partner/entities/carrier-partner.entity";
import { PartnerCreditConfig } from "src/modules/partner-credit-config/entities/partner-credit-config.entity";
import { DeliveryAddress } from "src/modules/delivery-address/entities/delivery-address.entity";
import { AccountsPayable } from "src/modules/accounts-payable/entities/accounts-payable.entity";
import { AccountsReceivable } from "src/modules/accounts-receivable/entities/accounts-receivable";
import { Product } from "src/modules/product/entities/product.entity";
import { ProductComponent } from "src/modules/product/entities/product-component.entity";
import { ProductStock } from "src/modules/product/entities/product-stock.entity";
import { ProductStockAddress } from "src/modules/product/entities/product-stock-address.entity";
import { ProductNotaFiscal } from "src/modules/product/entities/product-nota-fiscal.entity";
import { ProductIvaItem } from "src/modules/product/entities/product-iva-item.entity";
import { Representative } from "src/modules/representative/entities/representative.entity";
import { Bank } from "src/modules/bank/entities/bank.entity";
import { Group } from "src/modules/group/entities/group.entity";
import { GroupEnterprise } from "src/modules/group-enterprise/entity/group-enterprise.entity";


export enum EDatabase {
  YACHID = 'yachid',
}

const commonConfig = {
  type: 'postgres' as const,
  namingStrategy: new SnakeNamingStrategy(),
};


export const dbYachidConfig = registerAs('databaseYachid', () => ({
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'yachid',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  entities: [Employee, Enterprise, Address, Accounting, RevenueTaxDetails, Photo, Entrepreneur, User, TaxRegime, Branch, Partner, PaymentAddress, Carrier, CarrierPartner, PartnerCreditConfig, DeliveryAddress, AccountsPayable, AccountsReceivable, Product, ProductComponent, ProductStock, ProductStockAddress, ProductNotaFiscal, ProductIvaItem, Representative, Bank, Group, GroupEnterprise],
  logging: false,
  synchronize: true,
}));

export const DatabaseConfigModule = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    name: EDatabase.YACHID,
    useFactory: (configService: ConfigService) => {
      const config = configService.get('databaseYachid', { infer: true });
      return {
        ...commonConfig,
        ...config,
      };
    },
    inject: [ConfigService],
  })
];