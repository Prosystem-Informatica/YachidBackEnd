import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./listCustomerUseCase";

export class ListCustomersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { search, status, partner_type } = req.query;

      const listCustomersUseCase = container.resolve(ListCustomersUseCase);
      const customers = await listCustomersUseCase.execute({
        search: search as string,
        status: status as string,
        partner_type: partner_type as string,
      });

      return res.json(customers);
    } catch (error) {
      console.error("❌ Erro ao listar clientes:", error);
      return res.status(500).json({ message: "Erro ao listar clientes" });
    }
  }
}
