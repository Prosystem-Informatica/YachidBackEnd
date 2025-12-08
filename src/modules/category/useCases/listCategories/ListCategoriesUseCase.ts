import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "../../entities/Category";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(enterprise_id: number): Promise<Category[]> {
    return this.categoryRepository.findAllByEnterprise(enterprise_id);
  }
}
