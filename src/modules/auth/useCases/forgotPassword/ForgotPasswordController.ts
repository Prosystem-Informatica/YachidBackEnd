import { Request, Response } from "express";
import { container } from "tsyringe";
import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

export class ForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { identifier } = req.body;
    const useCase = container.resolve(ForgotPasswordUseCase);
    await useCase.execute(identifier);
    return res.status(200).json({ message: "E-mail não encontrado." });
  }
}
