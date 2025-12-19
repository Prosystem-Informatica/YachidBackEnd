import { inject, injectable } from "tsyringe";
import { AppDataSource } from "../../../../../config/database";
import { AppError } from "../../../../../shared/errors/AppError";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ProductFiscal } from "../../../productFiscal/entities/ProductFiscal";
import { ProductPrice } from "../../../productPrice/entities/ProductPrice";
import { ProductImage } from "../../../productImage/entities/ProductImage";
import { ProductComposition } from "../../../productComposition/entities/ProductComposition";

interface IRequest {
  enterprise_id: number;
  category_id?: number;
  code: string;
  name: string;
  barcode?: string;
  unit?: string;
  manufacturer_id?: number;
  type?: string;
  stock_location?: string;
  weight_gross?: number;
  weight_net?: number;
  packaging?: string;
  stock_quantity?: number;
  stock_minimum?: number;
  stock_maximum?: number;
  cost_price: number;
  profit_margin: number;
  sale_price: number;
  active?: boolean;
  fiscal?: Partial<ProductFiscal>;
  prices?: Partial<ProductPrice>[];
  images?: Partial<ProductImage>[];
  compositions?: Partial<ProductComposition>[];
}

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(data: IRequest): Promise<Product> {
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

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = queryRunner.manager.create(Product, {
        enterprise_id: data.enterprise_id,
        category_id: data.category_id ?? undefined,
        code: data.code,
        name: data.name,
        barcode: data.barcode ?? "SEM GTIN",
        unit: data.unit ?? "UN",
        manufacturer_id: data.manufacturer_id ?? undefined,
        type: data.type ?? undefined,
        stock_location: data.stock_location ?? undefined,
        weight_gross: data.weight_gross ?? 0,
        weight_net: data.weight_net ?? 0,
        packaging: data.packaging ?? undefined,
        stock_quantity: data.stock_quantity ?? 0,
        stock_minimum: data.stock_minimum ?? 0,
        stock_maximum: data.stock_maximum ?? 0,
        cost_price: data.cost_price ?? 0,
        profit_margin: data.profit_margin ?? 0,
        sale_price: data.sale_price ?? 0,
        active: data.active ?? true,
      });

      const savedProduct = await queryRunner.manager.save(Product, product);

      if (data.fiscal) {
        const fiscal = queryRunner.manager.create(ProductFiscal, {
          ...data.fiscal,
          product_id: savedProduct.id,
        });
        await queryRunner.manager.save(ProductFiscal, fiscal);
      }

      if (data.prices && data.prices.length > 0) {
        const prices = data.prices.map((price) =>
          queryRunner.manager.create(ProductPrice, {
            ...price,
            product_id: savedProduct.id,
          })
        );
        await queryRunner.manager.save(ProductPrice, prices);
      }

      if (data.images && data.images.length > 0) {
        const images = data.images.map((image) =>
          queryRunner.manager.create(ProductImage, {
            ...image,
            product_id: savedProduct.id,
            image_url: image.image_url, // Aqui é onde vamos salvar o caminho da imagem
          })
        );
        await queryRunner.manager.save(ProductImage, images);
      }

      if (data.compositions && data.compositions.length > 0) {
        const compositionRepo = AppDataSource.getRepository(ProductComposition);

        const compositionsToLink: ProductComposition[] = [];

        for (const compData of data.compositions) {
          let composition: ProductComposition | null = null;

          if (compData.id) {
            composition = await compositionRepo.findOneBy({ id: compData.id });
          }

          if (!composition) {
            composition = compositionRepo.create({
              name: compData.name,
              description: compData.description,
              quantity: compData.quantity ?? 1,
              component_cost: compData.component_cost ?? 0,
              active: compData.active ?? true,
            });
            composition = await compositionRepo.save(composition);
          }

          compositionsToLink.push(composition);
        }

        savedProduct.compositions = compositionsToLink;
        await queryRunner.manager.save(Product, savedProduct);
      }

      await queryRunner.commitTransaction();

      const fullProduct = await AppDataSource.getRepository(Product).findOne({
        where: { id: savedProduct.id },
        relations: [
          "fiscalData",
          "prices",
          "images",
          "compositions",
          "category",
          "manufacturer",
        ],
      });

      return fullProduct!;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("❌ Erro ao criar produto completo:", error);
      throw new AppError("Erro ao criar produto completo", 500);
    } finally {
      await queryRunner.release();
    }
  }
}
