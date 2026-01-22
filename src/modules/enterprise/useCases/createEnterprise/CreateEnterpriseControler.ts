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
    const {
      name,
      status,
      logo,
      cnpj_cpf,
      phone,
      cert_filename,
      cert_password,
      csc_id,
      csc_token,
      environment,
      address,
      tipo_regime,
      codigo_cidade,
      inscricao_estadual,
      inscricao_municipal,
      contabilidade,
      receita,
    } = req.body;

    const createEnterpriseUseCase = container.resolve(CreateEnterpriseUseCase);

    const enterprise = await createEnterpriseUseCase.execute({
      name,
      status,
      logo,
      cnpj_cpf,
      phone,
      cert_filename,
      cert_password,
      csc_id,
      csc_token,
      environment,
      address,
      tipo_regime,
      codigo_cidade,
      inscricao_estadual,
      inscricao_municipal,
      contabilidade,
      receita,
    });

    return res.status(201).json(enterprise);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const enterpriseUpdated = await this.enterpriseRepository.update(
      Number(id),
      data
    );

    return res.json(enterpriseUpdated);
  }
}
