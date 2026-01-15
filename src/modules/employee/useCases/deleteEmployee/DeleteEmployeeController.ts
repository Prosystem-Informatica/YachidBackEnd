import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteEmployeeUseCase } from "./DeleteEmployeeUseCase";

export class DeleteEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteEmployeeUseCase = container.resolve(DeleteEmployeeUseCase);
    await deleteEmployeeUseCase.execute(id);

    return res.status(204).send();
  }
}
