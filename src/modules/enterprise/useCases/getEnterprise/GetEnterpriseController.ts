import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetEnterpriseUseCase } from "./GetEnterpriseUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class GetEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      throw new AppError("ID da empresa inválido", 400);
    }

    const getEnterpriseUseCase = container.resolve(GetEnterpriseUseCase);

    const enterprise = await getEnterpriseUseCase.execute(Number(id));

    if (!enterprise) {
      throw new AppError("Empresa não encontrada", 404);
    }

    return res.status(200).json(enterprise);
  }
}
