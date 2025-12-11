import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./createProductUseCase";

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const toNumber = (value: any, defaultValue = 0): number => {
        const n = Number(value);
        return isNaN(n) ? defaultValue : n;
      };

      const productData = {
        enterprise_id: toNumber(body.enterprise_id, 1),
        category_id: body.category_id ? toNumber(body.category_id) : undefined,
        code: body.code,
        name: body.name,
        description: body.description ?? null,
        barcode: body.barcode ?? "SEM GTIN",
        unit: body.unit ?? "UN",
        manufacturer_id: body.manufacturer_id
          ? toNumber(body.manufacturer_id)
          : undefined,
        classification: body.classification ?? undefined,
        weight_gross: toNumber(body.weight_gross),
        weight_net: toNumber(body.weight_net),
        packaging: body.packaging ?? undefined,
        stock_quantity: toNumber(body.stock_quantity),
        stock_minimum: toNumber(body.stock_minimum),
        stock_maximum: toNumber(body.stock_maximum),
        active:
          typeof body.active === "boolean"
            ? body.active
            : body.active === "false"
            ? false
            : true,
      };

      console.log("📦 Payload final enviado ao UseCase:", productData);

      const createProductUseCase = container.resolve(CreateProductUseCase);
      const product = await createProductUseCase.execute(productData);

      return res.status(201).json(product);
    } catch (error: any) {
      console.error("❌ Erro ao criar produto:", error);
      return res
        .status(400)
        .json({ error: error.message || "Erro ao criar produto" });
    }
  }
}
