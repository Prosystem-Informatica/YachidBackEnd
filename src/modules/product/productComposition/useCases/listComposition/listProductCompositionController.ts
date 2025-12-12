import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductCompositionUseCase } from "./listProductCompositionUseCase";

export class ListProductCompositionController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const listUseCase = container.resolve(ListProductCompositionUseCase);
      const compositions = await listUseCase.execute();
      return res.status(200).json(compositions);
    } catch (error: any) {
      console.error("❌ Erro ao listar composições:", error);
      return res
        .status(error.statusCode || 400)
        .json({ error: error.message || "Erro ao listar composições" });
    }
  }
}
