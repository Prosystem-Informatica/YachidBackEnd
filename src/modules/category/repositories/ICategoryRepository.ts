import { Category } from "../entities/Category";

export interface ICategoryRepository {
  create(data: { name: string; enterprise_id: number }): Promise<Category>;
  findByName(name: string, enterprise_id: number): Promise<Category | null>;
  findAllByEnterprise(enterprise_id: number): Promise<Category[]>;
}
