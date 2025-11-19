import { Repository } from "typeorm";
import { IInvoiceRepository } from "./IInvoiceRepository";
import { Invoice } from "../entities/envoice";
import { AppDataSource } from "../../../config/database";
import { ICreateInvoiceDTO } from "../dto/ICreateInvoiceDTO";

export class InvoiceRepository implements IInvoiceRepository {
  private repository: Repository<Invoice>;

  constructor() {
    this.repository = AppDataSource.getRepository(Invoice);
  }
  findEnterpriseById(enterprise_id: number): Promise<Invoice[]> {
    throw new Error("Method not implemented.");
  }
  findCustomerById(customer_id: number): Promise<Invoice[]> {
    throw new Error("Method not implemented.");
  }

  async create(data: ICreateInvoiceDTO): Promise<Invoice> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const total = data.items.reduce((sum, item) => sum + item.total_price, 0);
      const invoice = queryRunner.manager.create(Invoice, {
        enterprise_id: data.enterprise_id,
        customer_id: data.customer_id,
        total,
        model: data.model,
        serie: data.serie,
        number: data.number,
        status: "pending",
      });

      await queryRunner.manager.save(invoice);

      for (const item of data.items) {
        await queryRunner.manager.query(
          `
        INSERT INTO invoice_items 
          (invoice_id, product_id, quantity, unit_price, total_price, cfop, ncm)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
          [
            invoice.id,
            item.product_id,
            item.quantity,
            item.unit_price,
            item.total_price,
            item.cfop,
            item.ncm,
          ]
        );
      }

      await queryRunner.commitTransaction();

      return invoice;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number): Promise<Invoice | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Invoice[]> {
    return await this.repository.find();
  }

  async updateStatus(
    id: string,
    status: Invoice["status"],
    protocol?: string
  ): Promise<void> {
    await this.repository.update(id, { status, protocol });
  }
}
