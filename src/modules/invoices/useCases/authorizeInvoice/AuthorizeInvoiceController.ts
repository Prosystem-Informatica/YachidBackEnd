import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthorizeInvoiceUseCase } from "./AuthorizeInvoiceUseCase";
import { NFeService } from "../../services/NFeService";

export class AuthorizeInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const nfeService = new NFeService();
    const authorizeInvoiceUseCase = container.resolve(AuthorizeInvoiceUseCase);
    (authorizeInvoiceUseCase as any).nfeService = nfeService;

    const result = await authorizeInvoiceUseCase.execute(id);

    return res.json(result);
  }
}
