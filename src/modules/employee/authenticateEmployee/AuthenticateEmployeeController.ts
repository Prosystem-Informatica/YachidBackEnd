import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";

export class AuthenticateEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { identifier, password } = req.body;

      const authenticateUseCase = container.resolve(
        AuthenticateEmployeeUseCase
      );

      const result = await authenticateUseCase.execute({
        identifier,
        password,
      });

      return res.status(200).json(result);
    } catch (err: any) {
      return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Erro ao autenticar usuário" });
    }
  }
}
