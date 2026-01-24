import { ConfigModule, ConfigService, registerAs } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Employee } from "src/modules/employee/entities/employee.entity";
import { Enterprise } from "src/modules/enterprise/entities/enterprise.entity";
import { Address } from "src/modules/address/entities/address.entity";
import { Accounting } from "src/modules/accounting/entities/accounting.entity";
import { RevenueTaxDetails } from "src/modules/revenue-tax-details/entities/revenue-tax-details.entity";
import { Photo } from "src/modules/photos/entities/photo.entity";

export enum EDatabase {
    YACHID = 'yachid',
}

const commonConfig = {
    type: 'postgres' as const,
    namingStrategy: new SnakeNamingStrategy(),
  };


export const dbYachidConfig = registerAs('databaseYachid', () => ({
    host: process.env.DB_HOST || 'localhost',
    username:  process.env.DB_USERNAME || 'postgres',
    password:  process.env.DB_PASSWORD || 'postgres',
    database:  process.env.DB_NAME || 'yachid',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    entities: [Employee, Enterprise, Address, Accounting, RevenueTaxDetails, Photo],
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