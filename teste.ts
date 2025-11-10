import { EmitInvoiceUseCase } from "./src/modules/invoices/useCases/emitInvoice/EmitInvoiceUseCase";

const teste = async () => {
  const useCase = new EmitInvoiceUseCase();
  await useCase.execute();
};

teste();
