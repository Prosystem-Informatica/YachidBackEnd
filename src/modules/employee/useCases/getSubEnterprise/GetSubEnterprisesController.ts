import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetSubEnterprisesUseCase } from "./GetSubEnterprisesUseCase";

export class GetSubEnterprisesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const useCase = container.resolve(GetSubEnterprisesUseCase);

    try {
      const subEnterprises = await useCase.execute(id);
      return res.json(subEnterprises);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
