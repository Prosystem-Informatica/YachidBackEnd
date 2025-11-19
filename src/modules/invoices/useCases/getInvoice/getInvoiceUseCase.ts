import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class GetInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository
  ) {}

  async execute(id: number) {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      throw new AppError("Nota fiscal não encontrada", 404);
    }

    return invoice;
  }
}
