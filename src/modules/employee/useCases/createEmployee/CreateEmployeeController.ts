import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

export class CreateEmployeeController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
        email,
        password,
        phone,
        cnpj_cpf,
        enterpriseId,
        subEnterpriseIds,
        status = true,
        role,
      } = req.body;

      const subIds: number[] = Array.isArray(subEnterpriseIds)
        ? subEnterpriseIds.map((id) => Number(id))
        : [];

      const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase);

      const employee = await createEmployeeUseCase.execute({
        name,
        email,
        password,
        phone,
        cnpj_cpf,
        enterpriseId,
        subEnterpriseIds: subIds,
        status,
        role,
      });

      const { password: _, ...result } = employee;

      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(err.statusCode || 500).json({
        message: err.message || "Erro ao criar funcionário",
      });
    }
  }
}
