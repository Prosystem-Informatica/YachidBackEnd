import { inject, injectable } from "tsyringe";
import { IProductCompositionRepository } from "../../repositories/IProductCompositionRepository";
import { ProductComposition } from "../../entities/ProductComposition";

@injectable()
export class ListProductCompositionUseCase {
  constructor(
    @inject("ProductCompositionRepository")
    private compositionRepository: IProductCompositionRepository
  ) {}

  async execute(): Promise<ProductComposition[]> {
    const compositions = await this.compositionRepository.findAll();
    return compositions;
  }
}
