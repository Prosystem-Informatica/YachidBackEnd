import { inject, injectable } from "tsyringe";
import { IProductCompositionRepository } from "../../repositories/IProductCompositionRepository";
import { ICreateProductCompositionDTO } from "../../dtos/ICreateProductCompositionDTO";
import { ProductComposition } from "../../entities/ProductComposition";

@injectable()
export class CreateProductCompositionUseCase {
  constructor(
    @inject("ProductCompositionRepository")
    private compositionRepository: IProductCompositionRepository
  ) {}

  async execute(
    data: ICreateProductCompositionDTO
  ): Promise<ProductComposition> {
    const composition = await this.compositionRepository.create({
      name: data.name ?? undefined,
      description: data.description ?? undefined,
      quantity: data.quantity ?? 1,
      component_cost: data.component_cost ?? 0,
      active: data.active ?? true,
    });

    return composition;
  }
}
