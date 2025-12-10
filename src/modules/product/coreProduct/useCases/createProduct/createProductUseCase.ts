import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { Category } from "../../../category/entities/Category";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute({
    name,
    description,
    price,
    quantity,
    cfop,
    ncm,
    enterprise_id,
    cProd,
    uCom,
    uTrib,
    cEAN,
    cEANTrib,
    cst,
    orig,
    icms_rate,
    ipi_rate,
    pis_rate,
    cofins_rate,
    pCredSN,
    vCredICMSSN,
    cost_price,
    profit_margin,
    profit_value,
    category_id,
  }: ICreateProductDTO & { category?: Category }): Promise<Product> {
    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError("Produto já existe", 400);
    }

    const product = await this.productRepository.create({
      name,
      description,
      price,
      quantity,
      cfop,
      ncm,
      enterprise_id,
      cProd,
      uCom,
      uTrib,
      cEAN,
      cEANTrib,
      cst,
      orig,
      icms_rate,
      ipi_rate,
      pis_rate,
      cofins_rate,
      pCredSN,
      vCredICMSSN,
      cost_price,
      profit_margin,
      profit_value,
      category_id,
    });

    return product;
  }
}
