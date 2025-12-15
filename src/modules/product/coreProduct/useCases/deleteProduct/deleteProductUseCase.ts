import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
export class DeleteProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error("Produto não encontrado");
    }

    await this.productRepository.delete(id);
  }
}
