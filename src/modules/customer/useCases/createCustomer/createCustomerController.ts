import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./createCustomerUseCase";

export class CreateCustomerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit,
    } = req.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit,
    });

    return res.status(201).json(customer);
  }
}
