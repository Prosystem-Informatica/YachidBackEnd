import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { identifier, code, new_password } = req.body;
    const useCase = container.resolve(ResetPasswordUseCase);
    await useCase.execute({ identifier, code, new_password });
    return res.status(200).json({ message: "Senha atualizada com sucesso." });
  }
}
