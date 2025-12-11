import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(data: ICreateProductDTO): Promise<Product> {
    const { name, enterprise_id } = data;

    const existing = await this.productRepository.findByEnterpriseId(
      enterprise_id
    );
    const productAlreadyExists = existing.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (productAlreadyExists) {
      throw new AppError("Produto já existe para esta empresa", 400);
    }

    const product = await this.productRepository.create({
      enterprise_id: data.enterprise_id,
      category_id: data.category_id ?? undefined,
      code: data.code,
      name: data.name,
      description: data.description ?? null,
      barcode: data.barcode ?? "SEM GTIN",
      unit: data.unit ?? "UN",
      manufacturer_id: data.manufacturer_id ?? undefined,
      classification: data.classification ?? undefined,
      weight_gross: data.weight_gross ?? 0,
      weight_net: data.weight_net ?? 0,
      packaging: data.packaging ?? undefined,
      stock_quantity: data.stock_quantity ?? 0,
      stock_minimum: data.stock_minimum ?? 0,
      stock_maximum: data.stock_maximum ?? 0,
      active: data.active ?? true,
    });

    return product;
  }
}
