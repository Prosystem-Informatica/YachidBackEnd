import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSubEnterpriseUseCase } from "./UpdateSubEnterpriseUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class UpdateSubEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { subId } = req.params;
    const data = req.body;

    if (!subId || isNaN(Number(subId))) {
      throw new AppError("ID da subempresa inválido", 400);
    }

    const updateSubEnterpriseUseCase = container.resolve(
      UpdateSubEnterpriseUseCase
    );

    const updatedSubEnterprise = await updateSubEnterpriseUseCase.execute(
      Number(subId),
      data
    );

    return res.status(200).json(updatedSubEnterprise);
  }
}
