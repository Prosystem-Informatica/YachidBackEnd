import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductCompositionUseCase } from "./updateProductCompositionUseCase";

export class UpdateProductCompositionController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const updateUseCase = container.resolve(UpdateProductCompositionUseCase);
      const updatedComposition = await updateUseCase.execute(id, data);

      return res.status(200).json(updatedComposition);
    } catch (error: any) {
      console.error("❌ Erro ao atualizar composição:", error);
      return res
        .status(error.statusCode || 400)
        .json({ error: error.message || "Erro ao atualizar composição" });
    }
  }
}
