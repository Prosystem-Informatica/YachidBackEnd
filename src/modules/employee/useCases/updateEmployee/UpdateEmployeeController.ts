import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

export class UpdateEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const updateEmployeeUseCase = container.resolve(UpdateEmployeeUseCase);
    const employee = await updateEmployeeUseCase.execute(id, data);

    const { password, ...result } = employee;

    return res.json(result);
  }
}
