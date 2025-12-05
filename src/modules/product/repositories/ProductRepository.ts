import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../entities/Product";
import { IProductRepository } from "./IProductRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      cProd: data.cProd,
      name: data.name,
      description: data.description ?? null,
      category: data.category ?? null,
      ncm: data.ncm,
      cest: data.cest ?? null,
      cfop: data.cfop,
      uCom: data.uCom ?? "UN",
      uTrib: data.uTrib ?? "UN",
      cEAN: data.cEAN ?? "SEM GTIN",
      cEANTrib: data.cEANTrib ?? "SEM GTIN",
      cst: data.cst ?? "102",
      orig: data.orig ?? "0",
      icms_rate: data.icms_rate ?? 0,
      ipi_rate: data.ipi_rate ?? 0,
      pis_rate: data.pis_rate ?? 0,
      cofins_rate: data.cofins_rate ?? 0,
      pCredSN: data.pCredSN ?? 0,
      vCredICMSSN: data.vCredICMSSN ?? 0,
      cost_price: data.cost_price,
      profit_margin: data.profit_margin,
      profit_value: data.profit_value,
      price: data.price,
      quantity: data.quantity,
      status: data.status ?? true,
      enterprise_id: data.enterprise_id,
    });

    const saved = await this.repository.save(product);
    console.log("✅ Produto salvo no banco:", saved);

    return saved;
  }

  async findById(id: number): Promise<Product | null> {
    return await this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.find();
  }

  async findByEnterpriseId(enterprise_id: number): Promise<Product[]> {
    return await this.repository.findBy({ enterprise_id });
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
    const existing = await this.repository.findOneBy({ id });
    if (!existing) return null;
    await this.repository.update(
      id,
      data as unknown as QueryDeepPartialEntity<Product>
    );
    return await this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
