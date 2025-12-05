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
        cProd: body.cProd,
        name: body.name,
        description: body.description ?? null,
        category: body.category ?? null,
        ncm: body.ncm,
        cfop: body.cfop,
        cest: body.cest ?? null,
        uCom: body.uCom ?? "UN",
        uTrib: body.uTrib ?? "UN",
        cEAN: body.cEAN ?? "SEM GTIN",
        cEANTrib: body.cEANTrib ?? "SEM GTIN",
        cst: body.cst ?? "102",
        orig: body.orig ?? "0",
        icms_rate: toNumber(body.icms_rate),
        ipi_rate: toNumber(body.ipi_rate),
        pis_rate: toNumber(body.pis_rate),
        cofins_rate: toNumber(body.cofins_rate),
        pCredSN: toNumber(body.pCredSN),
        vCredICMSSN: toNumber(body.vCredICMSSN),
        cost_price: toNumber(body.cost_price),
        price: toNumber(body.price),
        profit_margin: toNumber(body.profit_margin),
        profit_value: toNumber(body.profit_value),
        quantity: toNumber(body.quantity, 1),
        status: body.status ?? true,
        enterprise_id: toNumber(body.enterprise_id, 1),
      };

      console.log("📦 Payload final enviado ao UseCase:", productData);
      console.log("📦 Body recebido:", req.body);

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
