import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthorizeInvoiceUseCase } from "./AuthorizeInvoiceUseCase";

export class AuthorizeInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const authorizeInvoiceUseCase = container.resolve(AuthorizeInvoiceUseCase);
    const result = await authorizeInvoiceUseCase.execute(id);

    return res.json(result);
  }
}
