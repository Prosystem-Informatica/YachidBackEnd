import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSubEnterprisesUseCase } from "./ListSubEnterprisesUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class ListSubEnterprisesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { enterpriseId } = req.params;

    if (!enterpriseId || isNaN(Number(enterpriseId))) {
      throw new AppError("ID da empresa principal inválido", 400);
    }

    const listSubEnterprisesUseCase = container.resolve(
      ListSubEnterprisesUseCase
    );

    const subEnterprises = await listSubEnterprisesUseCase.execute(
      Number(enterpriseId)
    );

    return res.status(200).json(subEnterprises);
  }
}
