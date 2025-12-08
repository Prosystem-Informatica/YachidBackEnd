import { Product } from "../entities/Product";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";

export interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByEnterpriseId(enterprise_id: number): Promise<Product[]>;
  findByName(name: string): Promise<Product | null>;
  findByCategory(category_id: number): Promise<Product[]>;
  update(id: number, data: Partial<ICreateProductDTO>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}
