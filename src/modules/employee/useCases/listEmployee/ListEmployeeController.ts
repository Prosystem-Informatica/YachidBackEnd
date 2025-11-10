import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEmployeesUseCase } from "./ListEmployeeUseCase";

export class ListEmployeesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listEmployeesUseCase = container.resolve(ListEmployeesUseCase);
    const employees = await listEmployeesUseCase.execute();

    return res.json(employees);
  }
}
