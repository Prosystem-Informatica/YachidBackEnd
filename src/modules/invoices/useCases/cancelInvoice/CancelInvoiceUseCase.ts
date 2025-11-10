import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { NFeService } from "../../services/NFeService";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CancelInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository,
    private nfeService: NFeService
  ) {}

  async execute(invoiceId: string, justification: string) {
    const invoice = await this.invoiceRepository.findById(Number(invoiceId));

    if (!invoice) {
      throw new AppError("Nota fiscal não encontrada", 404);
    }

    if (invoice.status !== "authorized") {
      throw new AppError("Somente notas autorizadas podem ser canceladas", 400);
    }

    const result = await this.nfeService.cancel(invoiceId, justification);

    if (result.success) {
      await this.invoiceRepository.updateStatus(invoiceId, "cancelled");
    }

    return result;
  }
}
