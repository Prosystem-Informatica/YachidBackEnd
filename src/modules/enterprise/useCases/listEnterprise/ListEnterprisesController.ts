import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEnterprisesUseCase } from "./listEnterprisesUseCase";

export class ListEnterprisesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listEnterprisesUseCase = container.resolve(ListEnterprisesUseCase);

    const enterprises = await listEnterprisesUseCase.execute();

    return res.status(200).json(enterprises);
  }
}
