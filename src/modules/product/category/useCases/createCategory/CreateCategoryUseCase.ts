import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "../../entities/Category";

interface IRequest {
  name: string;
  enterprise_id: number;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, enterprise_id }: IRequest): Promise<Category> {
    const existing = await this.categoryRepository.findByName(
      name,
      enterprise_id
    );
    if (existing) {
      throw new Error("Categoria já existe nesta empresa.");
    }

    const category = await this.categoryRepository.create({
      name,
      enterprise_id,
    });
    return category;
  }
}
