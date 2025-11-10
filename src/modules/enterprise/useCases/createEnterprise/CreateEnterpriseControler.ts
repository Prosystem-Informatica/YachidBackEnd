import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEnterpriseUseCase } from "./CreateEnterpriseUseCase";

export class CreateEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, status, logo, cnpj_cpf, branches, phone } =
      req.body;

    const createEnterpriseUseCase = container.resolve(CreateEnterpriseUseCase);

    const enterprise = await createEnterpriseUseCase.execute({
      name,
      email,
      password,
      status,
      logo,
      cnpj_cpf,
      branches,
      phone,
    });

    return res.status(201).json(enterprise);
  }
}
