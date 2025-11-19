import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./createProductUseCase";

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        price,
        quantity,
        category,
        cfop,
        ncm,
        enterprise_id,
      } = req.body;

      const createProductUseCase = container.resolve(CreateProductUseCase);

      const product = await createProductUseCase.execute({
        name,
        description,
        price,
        quantity,
        category,
        cfop,
        ncm,
        enterprise_id,
      });

      return res.status(201).json(product);
    } catch (error: any) {
      console.error("❌ Erro ao criar produto:", error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}
