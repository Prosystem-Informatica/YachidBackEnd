import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./createProductUseCase";

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      console.log("📦 Payload recebido:", data);

      const createProductUseCase = container.resolve(CreateProductUseCase);
      const product = await createProductUseCase.execute(data);

      return res.status(201).json(product);
    } catch (error: any) {
      console.error("❌ Erro ao criar produto:", error);
      return res.status(400).json({
        error: error.message || "Erro ao criar produto completo",
      });
    }
  }
}
