import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetInvoiceUseCase } from "./getInvoiceUseCase";

export class GetInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getInvoiceUseCase = container.resolve(GetInvoiceUseCase);
    const invoice = await getInvoiceUseCase.execute(Number(id));
    return res.json(invoice);
  }
}
