import { ICreateInvoiceDTO } from "../dto/ICreateInvoiceDTO";
import { Invoice } from "../entities/envoice";

export interface IInvoiceRepository {
  create(data: ICreateInvoiceDTO): Promise<Invoice>;
  findById(id: number): Promise<Invoice | null>;
  findAll(): Promise<Invoice[]>;
  updateStatus(id: string, status: string, protocol?: string): Promise<void>;
}
