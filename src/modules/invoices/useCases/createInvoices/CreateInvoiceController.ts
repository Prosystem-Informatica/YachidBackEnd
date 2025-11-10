import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateInvoiceUseCase } from "./CreateInvoiceUseCase";

export class CreateInvoiceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createInvoiceUseCase = container.resolve(CreateInvoiceUseCase);

    const invoice = await createInvoiceUseCase.execute(data);

    return response.status(201).json(invoice);
  }
}
