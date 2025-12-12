import { ProductComposition } from "../entities/ProductComposition";
import { ICreateProductCompositionDTO } from "../dtos/ICreateProductCompositionDTO";

export interface IProductCompositionRepository {
  create(data: ICreateProductCompositionDTO): Promise<ProductComposition>;
  findById(id: number): Promise<ProductComposition | null>;
  findAll(): Promise<ProductComposition[]>;
  update(
    id: number,
    data: Partial<ICreateProductCompositionDTO>
  ): Promise<ProductComposition | null>;
  delete(id: number): Promise<boolean>;
}
