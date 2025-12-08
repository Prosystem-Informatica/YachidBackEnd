import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const enterprise_id = Number(req.params.enterprise_id);
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
      const categories = await listCategoriesUseCase.execute(enterprise_id);
      return res.json(categories);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
