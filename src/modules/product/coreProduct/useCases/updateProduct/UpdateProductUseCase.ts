import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../../repositories/ProductRepository";

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: ProductRepository
  ) {}

  async execute(id: number, data: Partial<any>) {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error("Produto não encontrado");
    }

    const updatedProduct = await this.productRepository.update(id, data);

    return updatedProduct;
  }
}
