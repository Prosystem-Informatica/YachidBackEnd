import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

export class CreateEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      role,
    } = req.body;

    const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

    const employee = await createEmployeeUseCase.execute({
      name,
      email,
      password,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      role,
    });

    return res.status(201).json(employee);
  }
}
