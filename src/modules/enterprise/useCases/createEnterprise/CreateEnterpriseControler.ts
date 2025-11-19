import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEnterpriseUseCase } from "./CreateEnterpriseUseCase";
import { EnterpriseRepository } from "../../repositories/EnterpriseRepository";

export class CreateEnterpriseController {
  private enterpriseRepository: EnterpriseRepository;

  constructor() {
    this.enterpriseRepository = new EnterpriseRepository();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let {
      name,
      email,
      password,
      status,
      logo,
      cnpj_cpf,
      branches,
      phone,
      address,
    } = req.body;

    if (address && typeof address === "object") {
      address = JSON.stringify(address);
    }

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
      address,
    });

    return res.status(201).json(enterprise);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    if (data.address && typeof data.address === "object") {
      data.address = JSON.stringify(data.address);
    }

    const enterpriseUpdated = await this.enterpriseRepository.update(
      Number(id),
      data
    );

    return res.json(enterpriseUpdated);
  }
}
