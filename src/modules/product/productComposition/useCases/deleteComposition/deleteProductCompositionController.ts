import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductCompositionUseCase } from "./deleteProductCompositionUseCase";

export class DeleteProductCompositionController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const useCase = container.resolve(DeleteProductCompositionUseCase);
      await useCase.execute(Number(id));

      return res
        .status(200)
        .json({ message: "Composição excluída com sucesso" });
    } catch (error: any) {
      console.error("❌ Erro ao excluir composição:", error);
      return res.status(error.statusCode || 400).json({ error: error.message });
    }
  }
}
