import { Request, Response } from "express";
import { ProductRepository } from "../../repositories/ProductRepository";
import { container } from "tsyringe";

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, price, quantity, category, cfop, ncm } =
      req.body;

    const createProductRepository = container.resolve(ProductRepository);

    const product = await createProductRepository.create({
      name,
      description,
      price,
      quantity,
      category,
      cfop,
      ncm,
    });

    return res.status(201).json(product);
  }
}
