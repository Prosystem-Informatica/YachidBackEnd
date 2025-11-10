import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateEmployeeUseCase } from "./AuthenticateEmployeeUseCase";

export class AuthenticateEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateEmployeeUseCase = container.resolve(
      AuthenticateEmployeeUseCase
    );

    const tokenResponse = await authenticateEmployeeUseCase.execute({
      email,
      password,
    });

    return res.json(tokenResponse);
  }
}
