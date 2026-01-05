import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyResetCodeUseCase } from "./VerifyResetCodeUseCase";
import { AppError } from "../../../../shared/errors/AppError";

export class VerifyResetCodeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { identifier, code } = req.body;
    const useCase = container.resolve(VerifyResetCodeUseCase);

    try {
      await useCase.execute(identifier, code);
      return res.status(200).json({ message: "Código válido." });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      console.error("Erro ao verificar código:", error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}
