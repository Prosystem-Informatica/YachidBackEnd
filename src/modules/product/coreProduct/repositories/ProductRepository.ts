import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { IProductRepository } from "./IProductRepository";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AppDataSource } from "../../../../config/database";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      enterprise_id: data.enterprise_id,
      category_id: data.category_id ?? undefined,
      code: data.code,
      name: data.name,
      barcode: data.barcode ?? "SEM GTIN",
      unit: data.unit ?? "UN",
      manufacturer_id: data.manufacturer_id ?? undefined,
      stock_location: data.stock_location ?? undefined,
      type: data.type ?? undefined,
      weight_gross: data.weight_gross ?? 0,
      weight_net: data.weight_net ?? 0,
      packaging: data.packaging ?? undefined,
      stock_quantity: data.stock_quantity ?? 0,
      stock_minimum: data.stock_minimum ?? 0,
      stock_maximum: data.stock_maximum ?? 0,
      active: data.active ?? true,
    });

    return await this.repository.save(product);
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOne({
      where: { id },
      relations: [
        "category",
        "manufacturer",
        "fiscalData",
        "prices",
        "images",
        "composition",
        "used_in_compositions",
      ],
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find({
      relations: ["category", "manufacturer"],
      order: { id: "DESC" },
    });
  }

  async findByEnterpriseId(enterprise_id: number): Promise<Product[]> {
    return await this.repository.find({
      where: { enterprise_id },
      relations: ["category", "manufacturer"],
      order: { id: "DESC" },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return await this.repository.findOne({
      where: { name },
      relations: ["category", "manufacturer"],
    });
  }

  async findByCategory(category_id: number): Promise<Product[]> {
    return await this.repository.find({
      where: { category_id },
      relations: ["category", "manufacturer"],
    });
  }

  async update(
    id: number,
    data: Partial<ICreateProductDTO>
  ): Promise<Product | null> {
    const existing = await this.repository.findOneBy({ id });
    if (!existing) return null;

    await this.repository.update(
      id,
      data as unknown as QueryDeepPartialEntity<Product>
    );

    return await this.repository.findOne({
      where: { id },
      relations: [
        "category",
        "manufacturer",
        "fiscalData",
        "prices",
        "images",
        "composition",
        "used_in_compositions",
      ],
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
