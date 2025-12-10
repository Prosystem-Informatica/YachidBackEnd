import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../../entities/Product";

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
