import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { IEnterpriseRepository } from "../../../enterprise/repositories/IEnterpriseRepository";
import { ICustomerRepository } from "../../../customer/repositories/ICustomerRepository";
import { NFeService } from "../../services/NFeService";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class AuthorizeInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository,

    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository,

    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository,

    @inject("NFeService")
    private nfeService: NFeService
  ) {}

  async execute(invoiceId: string) {
    const id = Number(invoiceId);
    if (Number.isNaN(id)) throw new AppError("ID da nota fiscal inválido", 400);

    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) throw new AppError("Nota fiscal não encontrada", 404);
    if (invoice.status !== "pending")
      throw new AppError("A nota fiscal já foi processada", 400);

    const enterprise = await this.enterpriseRepository.findById(
      invoice.enterprise_id
    );
    const customer = await this.customerRepository.findById(
      invoice.customer_id
    );

    if (!enterprise || !customer)
      throw new AppError("Dados da empresa ou do cliente não encontrados", 400);

    const result = await this.nfeService.authorize(
      invoice,
      enterprise,
      customer
    );

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
