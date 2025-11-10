import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../entities/Product";

export interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  update(id: number, data: Partial<ICreateProductDTO>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}
