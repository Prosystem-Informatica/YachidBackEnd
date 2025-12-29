import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateEmployeeUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { identifier, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const tokenResponse = await authenticateUserUseCase.execute({
      identifier,
      password,
    });

    return res.json(tokenResponse);
  }
}
