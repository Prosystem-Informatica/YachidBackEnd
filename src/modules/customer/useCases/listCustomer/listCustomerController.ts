import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./listCustomerUseCase";

export class ListCustomersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCustomersUseCase = container.resolve(ListCustomersUseCase);
    const customers = await listCustomersUseCase.execute();

    return res.json(customers);
  }
}
