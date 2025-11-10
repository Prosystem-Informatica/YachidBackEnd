import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { NFeService } from "../../services/NFeService";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class AuthorizeInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository,
    private nfeService: NFeService
  ) {}

  async execute(invoiceId: string) {
    const id = Number(invoiceId);
    if (Number.isNaN(id)) {
      throw new AppError("ID da nota fiscal inválido", 400);
    }

    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) {
      throw new AppError("Nota fiscal não encontrada", 404);
    }

    if (invoice.status !== "pending") {
      throw new AppError("A nota fiscal já foi processada", 400);
    }

    const result = await this.nfeService.authorize(invoiceId);

    if (result.success) {
      await this.invoiceRepository.updateStatus(
        invoiceId,
        "authorized",
        result.protocol
      );
    }

    return result;
  }
}
