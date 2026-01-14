import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateEnterpriseUseCase } from "./UpdateEnterpriseUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class UpdateEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    if (!id || isNaN(Number(id))) {
      throw new AppError("ID da empresa inválido", 400);
    }

    const updateEnterpriseUseCase = container.resolve(UpdateEnterpriseUseCase);

    const updatedEnterprise = await updateEnterpriseUseCase.execute(
      Number(id),
      data
    );

    return res.status(200).json(updatedEnterprise);
  }
}
