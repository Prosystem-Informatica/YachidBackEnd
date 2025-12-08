import "reflect-metadata";
import { DataSource } from "typeorm";
import env from "./env";
import { Employee } from "../modules/employee/entities/Employee";
import { Enterprise } from "../modules/enterprise/entities/Enterprise";
import { Customer } from "../modules/customer/entities/Customer";
import { Product } from "../modules/product/entities/Product";
import { Invoice } from "../modules/invoices/entities/envoice";
import { InvoiceItem } from "../modules/invoices/entities/envoiceItem";
import { NFeXML } from "../modules/invoices/entities/NFeXML";
import { Category } from "../modules/category/entities/Category";

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
    Product,
    Invoice,
    InvoiceItem,
    NFeXML,
    Category,
  ],
  migrations: [],
  subscribers: [],
});
