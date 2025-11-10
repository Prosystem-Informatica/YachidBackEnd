import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { ICreateInvoiceDTO } from "../../dto/ICreateInvoiceDTO";

@injectable()
export class CreateInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository
  ) {}

  async execute(data: ICreateInvoiceDTO) {
    const invoice = await this.invoiceRepository.create(data);
    return invoice;
  }
}
