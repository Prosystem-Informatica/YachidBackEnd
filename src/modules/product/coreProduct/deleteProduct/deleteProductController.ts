import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductUseCase } from "./deleteProductUseCase";

export class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const deleteProductUseCase = container.resolve(DeleteProductUseCase);
      await deleteProductUseCase.execute(id);

      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error: any) {
      console.error("Erro ao excluir produto:", error);
      return res
        .status(400)
        .json({ error: error.message || "Erro ao excluir produto" });
    }
  }
}
