import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "./env";
import { Employee } from "../modules/employee/entities/Employee";
import { Enterprise } from "../modules/enterprise/entities/Enterprise";
import { Customer } from "../modules/customer/entities/Customer";
import { Invoice } from "../modules/invoices/entities/envoice";
import { InvoiceItem } from "../modules/invoices/entities/envoiceItem";
import { NFeXML } from "../modules/invoices/entities/NFeXML";
import { Product } from "../modules/product/coreProduct/entities/Product";
import { Category } from "../modules/product/category/entities/Category";
import { ProductComposition } from "../modules/product/productComposition/entities/ProductComposition";
import { ProductImage } from "../modules/product/productImage/entities/ProductImage";
import { ProductPrice } from "../modules/product/productPrice/entities/ProductPrice";
import { ProductFiscal } from "../modules/product/productFiscal/entities/ProductFiscal";
import { PasswordReset } from "../modules/auth/entities/PasswordReset";

export const AppDataSource = new DataSource({
  type: env.dbType,
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: env.dbSync,
  logging: env.dbLog,
  entities: [
    Employee,
    Enterprise,
    Customer,
    Invoice,
    InvoiceItem,
    NFeXML,
    Category,
    PasswordReset,

    //Product Entities :P
    Product,
    ProductFiscal,
    ProductPrice,
    ProductImage,
    ProductComposition,
  ],
  migrations: [],
  subscribers: [],
});
