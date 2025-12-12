import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { IProductCompositionRepository } from "../../repositories/IProductCompositionRepository";
import { ICreateProductCompositionDTO } from "../../dtos/ICreateProductCompositionDTO";
import { ProductComposition } from "../../entities/ProductComposition";

@injectable()
export class UpdateProductCompositionUseCase {
  constructor(
    @inject("ProductCompositionRepository")
    private compositionRepository: IProductCompositionRepository
  ) {}

  async execute(
    id: number,
    data: Partial<ICreateProductCompositionDTO>
  ): Promise<ProductComposition> {
    const existing = await this.compositionRepository.findById(id);

    if (!existing) {
      throw new AppError("Composição não encontrada", 404);
    }

    const updated = await this.compositionRepository.update(id, data);

    if (!updated) {
      throw new AppError("Erro ao atualizar composição", 400);
    }

    return updated;
  }
}
