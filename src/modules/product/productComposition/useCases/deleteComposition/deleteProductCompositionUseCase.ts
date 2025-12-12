import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { IProductCompositionRepository } from "../../repositories/IProductCompositionRepository";

@injectable()
export class DeleteProductCompositionUseCase {
  constructor(
    @inject("ProductCompositionRepository")
    private compositionRepository: IProductCompositionRepository
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.compositionRepository.findById(id);
    if (!existing) {
      throw new AppError("Composição não encontrada", 404);
    }

    const deleted = await this.compositionRepository.delete(id);
    if (!deleted) {
      throw new AppError("Erro ao excluir composição", 400);
    }
  }
}
