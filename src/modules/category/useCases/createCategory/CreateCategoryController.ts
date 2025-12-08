import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const enterprise_id = Number(req.params.enterprise_id);

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const category = await createCategoryUseCase.execute({
        name,
        enterprise_id,
      });

      return res.status(201).json(category);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
