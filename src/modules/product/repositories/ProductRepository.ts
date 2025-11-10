import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../entities/Product";
import { IProductRepository } from "./IProductRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create({
    name,
    description,
    price,
    quantity,
    cfop,
    ncm,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      description,
      price,
      quantity,
      cfop,
      ncm,
      category,
    });
    await this.repository.save(product);
    return product;
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.repository.findOneBy({ name });
  }

  async findByCategory(category: string): Promise<Product[]> {
    return await this.repository.findBy({ category });
  }

  async update(
    id: number,
    data: Partial<ICreateProductDTO>
  ): Promise<Product | null> {
    await this.repository.update(id, data);
    return await this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
