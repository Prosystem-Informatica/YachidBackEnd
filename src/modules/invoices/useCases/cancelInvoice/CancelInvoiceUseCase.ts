import { inject, injectable } from "tsyringe";
import { IInvoiceRepository } from "../../repositories/IInvoiceRepository";
import { NFeService } from "../../services/NFeService";
import { AppError } from "../../../../shared/errors/AppError";
import { AppDataSource } from "../../../../config/database";
import { NFeXML } from "../../entities/NFeXML";

@injectable()
export class CancelInvoiceUseCase {
  constructor(
    @inject("InvoiceRepository")
    private invoiceRepository: IInvoiceRepository,
    private nfeService: NFeService
  ) {}

  async execute(invoiceId: string, justification?: string) {
    const invoice = await this.invoiceRepository.findById(Number(invoiceId));
    if (!invoice) throw new AppError("Nota fiscal não encontrada", 404);

    if (invoice.status !== "authorized")
      throw new AppError("Somente notas autorizadas podem ser canceladas", 400);

    const xmlRepository = AppDataSource.getRepository(NFeXML);
    const nfeXml = await xmlRepository.findOne({
      where: { invoice_id: invoice.id },
    });
    if (!nfeXml)
      throw new AppError("XML da NF-e não encontrado para cancelamento", 404);

    const xmlMatch = nfeXml.xml.match(/<infNFe[^>]*Id="NFe(\d+)"/);
    if (!xmlMatch)
      throw new AppError("Chave da NF-e não encontrada no XML", 500);
    const invoiceKey = xmlMatch[1];

    const protocol = nfeXml.protocol;
    if (!protocol) throw new AppError("Protocolo da NF-e não encontrado", 500);

    if (!nfeXml.configuracoes)
      throw new AppError("Configurações da NF-e não encontradas", 500);

    let configuracoes;
    try {
      configuracoes = JSON.parse(nfeXml.configuracoes);
    } catch (err) {
      throw new AppError("Falha ao interpretar configurações da NF-e", 500);
    }

    const ambiente = configuracoes?.geral?.ambiente;
    if (!justification || justification.trim().length < 15) {
      if (ambiente === 2) {
        justification =
          "Cancelamento de teste - NF-e emitida em ambiente de homologação";
      } else {
        throw new AppError(
          "A justificativa deve conter pelo menos 15 caracteres.",
          400
        );
      }
    }

    const result = await this.nfeService.cancel(
      invoiceId,
      invoiceKey,
      protocol,
      configuracoes,
      justification
    );

    if (result.success) {
      await this.invoiceRepository.updateStatus(invoiceId, "cancelled");
    }

    return result;
  }
}
