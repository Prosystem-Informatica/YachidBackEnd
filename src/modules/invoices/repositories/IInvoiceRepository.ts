import { ICreateInvoiceDTO } from "../dto/ICreateInvoiceDTO";
import { Invoice } from "../entities/envoice";

export interface IInvoiceRepository {
  create(data: ICreateInvoiceDTO): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
  findEnterpriseById(enterprise_id: number): Promise<Invoice[]>;
  findCustomerById(customer_id: number): Promise<Invoice[]>;
  findAll(): Promise<Invoice[]>;
  updateStatus(id: string, status: string, protocol?: string): Promise<void>;
}
