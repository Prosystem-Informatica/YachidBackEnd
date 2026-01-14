import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubEnterpriseUseCase } from "./CreateSubEnterpriseUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class CreateSubEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { enterpriseId } = req.params;

    if (!enterpriseId || isNaN(Number(enterpriseId))) {
      throw new AppError("ID da empresa principal inválido", 400);
    }

    const {
      name,
      cnpj_cpf,
      address,
      tipo_regime,
      codigo_cidade,
      inscricao_estadual,
      inscricao_municipal,
      contabilidade,
      receita,
    } = req.body;

    const createSubEnterpriseUseCase = container.resolve(
      CreateSubEnterpriseUseCase
    );

    const subEnterprise = await createSubEnterpriseUseCase.execute({
      enterpriseId: Number(enterpriseId),
      name,
      cnpj_cpf,
      address,
      tipo_regime,
      codigo_cidade,
      inscricao_estadual,
      inscricao_municipal,
      contabilidade,
      receita,
    });

    return res.status(201).json(subEnterprise);
  }
}
