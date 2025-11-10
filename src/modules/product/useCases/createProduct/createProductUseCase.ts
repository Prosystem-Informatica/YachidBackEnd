import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

@injectable()
export class CreateProductUseCase {
  static handle(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>
  ): unknown {
    throw new Error(" Metodo não implementado.");
  }
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute({
    name,
    description,
    price,
    quantity,
    cfop,
    ncm,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError("Produto já existe", 400);
    }

    const product = await this.productRepository.create({
      name,
      description,
      price,
      quantity,
      category,
      cfop,
      ncm,
    });

    return product;
  }
}
