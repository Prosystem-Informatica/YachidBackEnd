import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

export class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ error: "ID do produto é obrigatório" });

      const data = req.body;

      const updateProductUseCase = container.resolve(UpdateProductUseCase);
      const updatedProduct = await updateProductUseCase.execute(Number(id), data);

      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error("❌ Erro ao atualizar produto:", error);
      return res.status(400).json({ error: error.message || "Erro ao atualizar produto" });
    }
  }
}
