import { Request, Response } from "express";
import { CustomerRepository } from "../../repositories/CustomerRepository";

export class ListSuppliersController {
  async handle(req: Request, res: Response) {
    const customerRepo = new CustomerRepository();
    const suppliers = await customerRepo.listSuppliers();
    return res.json(suppliers);
  }
}
