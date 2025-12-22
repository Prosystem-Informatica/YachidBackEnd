import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { IProductRepository } from "./IProductRepository";
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
      cost_price: data.cost_price ?? 0,
      profit_margin: data.profit_margin ?? 0,
      sale_price: data.sale_price ?? 0,
      stock_quantity: data.stock_quantity ?? 0,
      stock_minimum: data.stock_minimum ?? 0,
      stock_maximum: data.stock_maximum ?? 0,
      active: data.active ?? true,
      fiscalData: data.fiscal ?? undefined,
      prices: Array.isArray(data.prices) ? data.prices : [],
      images: Array.isArray(data.images) ? data.images : [],
      compositions: Array.isArray(data.compositions) ? data.compositions : [],
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
        "compositions",
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

  async update(id: number, data: any): Promise<Product | null> {
    const existing = await this.repository.findOne({
      where: { id },
      relations: [
        "category",
        "manufacturer",
        "fiscalData",
        "prices",
        "images",
        "compositions",
      ],
    });

    if (!existing) return null;

    Object.assign(existing, {
      enterprise_id: data.enterprise_id ?? existing.enterprise_id,
      category_id: data.category_id ?? existing.category_id,
      manufacturer_id: data.manufacturer_id ?? existing.manufacturer_id,
      code: data.code ?? existing.code,
      name: data.name ?? existing.name,
      description: data.description ?? existing.description,
      barcode: data.barcode ?? existing.barcode,
      unit: data.unit ?? existing.unit,
      stock_location: data.stock_location ?? existing.stock_location,
      type: data.type ?? existing.type,
      weight_gross: data.weight_gross ?? existing.weight_gross,
      weight_net: data.weight_net ?? existing.weight_net,
      packaging: data.packaging ?? existing.packaging,
      cost_price: data.cost_price ?? existing.cost_price,
      profit_margin: data.profit_margin ?? existing.profit_margin,
      sale_price: data.sale_price ?? existing.sale_price,
      stock_quantity: data.stock_quantity ?? existing.stock_quantity,
      stock_minimum: data.stock_minimum ?? existing.stock_minimum,
      stock_maximum: data.stock_maximum ?? existing.stock_maximum,
      active: data.active ?? existing.active,
    });

    existing.fiscalData = data.fiscal ?? existing.fiscalData;
    existing.prices = Array.isArray(data.prices)
      ? data.prices
      : existing.prices ?? [];
    existing.images = Array.isArray(data.images)
      ? data.images
      : existing.images ?? [];
    existing.compositions = Array.isArray(data.compositions)
      ? data.compositions
      : existing.compositions ?? [];

    console.log({
      fiscal: typeof existing.fiscalData,
      prices: Array.isArray(existing.prices),
      images: Array.isArray(existing.images),
      compositions: Array.isArray(existing.compositions),
    });

    return await this.repository.save(existing);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
