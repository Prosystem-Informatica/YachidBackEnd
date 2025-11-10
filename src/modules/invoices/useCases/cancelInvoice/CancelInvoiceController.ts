import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelInvoiceUseCase } from "./CancelInvoiceUseCase";
import { NFeService } from "../../services/NFeService";

export class CancelInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { justification } = req.body;

    const nfeService = new NFeService();
    const cancelInvoiceUseCase = container.resolve(CancelInvoiceUseCase);
    (cancelInvoiceUseCase as any).nfeService = nfeService;

    const result = await cancelInvoiceUseCase.execute(id, justification);

    return res.json(result);
  }
}
