import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductCompositionUseCase } from "./createProductCompositionUseCase";

export class CreateProductCompositionController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const useCase = container.resolve(CreateProductCompositionUseCase);
      const composition = await useCase.execute(req.body);
      return res.status(201).json(composition);
    } catch (error: any) {
      console.error("❌ Erro ao criar composição:", error);
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
