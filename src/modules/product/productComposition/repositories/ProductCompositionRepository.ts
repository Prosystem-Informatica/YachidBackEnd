import { Repository } from "typeorm";
import { AppDataSource } from "../../../../config/database";
import { ProductComposition } from "../entities/ProductComposition";
import { IProductCompositionRepository } from "./IProductCompositionRepository";
import { ICreateProductCompositionDTO } from "../dtos/ICreateProductCompositionDTO";

export class ProductCompositionRepository
  implements IProductCompositionRepository
{
  private readonly repository: Repository<ProductComposition>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductComposition);
  }

  async create(
    data: ICreateProductCompositionDTO
  ): Promise<ProductComposition> {
    const composition = this.repository.create({
      name: data.name ?? undefined,
      description: data.description ?? undefined,
      quantity: data.quantity ?? 1,
      component_cost: data.component_cost ?? 0,
      active: data.active ?? true,
    });

    return await this.repository.save(composition);
  }

  async findById(id: number): Promise<ProductComposition | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<ProductComposition[]> {
    return await this.repository.find({
      order: { id: "ASC" },
    });
  }

  async update(
    id: number,
    data: Partial<ICreateProductCompositionDTO>
  ): Promise<ProductComposition | null> {
    const existing = await this.repository.findOneBy({ id });
    if (!existing) return null;

    await this.repository.update(id, data);

    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
