import { Repository, DataSource } from "typeorm";
import { Category } from "../entities/Category";
import { ICategoryRepository } from "./ICategoryRepository";
import { injectable } from "tsyringe";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Category);
  }

  async create(data: {
    name: string;
    enterprise_id: number;
  }): Promise<Category> {
    const category = this.ormRepository.create(data);
    await this.ormRepository.save(category);
    return category;
  }

  async findByName(
    name: string,
    enterprise_id: number
  ): Promise<Category | null> {
    const category = await this.ormRepository.findOne({
      where: { name, enterprise_id },
    });
    return category;
  }

  async findAllByEnterprise(enterprise_id: number): Promise<Category[]> {
    return this.ormRepository.find({
      where: { enterprise_id },
      order: { name: "ASC" },
    });
  }
}
