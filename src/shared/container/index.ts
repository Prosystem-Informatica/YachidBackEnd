import { container } from "tsyringe";
import { IEmployeeRepository } from "../../modules/employee/repositories/IEmployeeRepository";
import { EmployeeRepository } from "../../modules/employee/repositories/EmployeeRepository";

container.registerSingleton<IEmployeeRepository>(
  "EmployeeRepository",
  EmployeeRepository
);

import { IEnterpriseRepository } from "../../modules/enterprise/repositories/IEnterpriseRepository";
import { EnterpriseRepository } from "../../modules/enterprise/repositories/EnterpriseRepository";

container.registerSingleton<IEnterpriseRepository>(
  "EnterpriseRepository",
  EnterpriseRepository
);

import { ICustomerRepository } from "../../modules/customer/repositories/ICustomerRepository";
import { CustomerRepository } from "../../modules/customer/repositories/CustomerRepository";

container.registerSingleton<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);

import { IProductRepository } from "../../modules/product/repositories/IProductRepository";
import { ProductRepository } from "../../modules/product/repositories/ProductRepository";

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

import { IInvoiceRepository } from "../../modules/invoices/repositories/IInvoiceRepository";
import { InvoiceRepository } from "../../modules/invoices/repositories/InvoiceRepository";

container.registerSingleton<IInvoiceRepository>(
  "InvoiceRepository",
  InvoiceRepository
);
