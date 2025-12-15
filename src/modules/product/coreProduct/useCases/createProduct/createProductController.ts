import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./createProductUseCase";
import fs from "fs";
import path from "path";

export class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      console.log("📦 Payload recebido:", data);

      if (data.images && Array.isArray(data.images) && data.images.length > 6) {
        return res
          .status(400)
          .json({ error: "Máximo de 6 imagens permitidas por produto." });
      }

      if (data.images && Array.isArray(data.images)) {
        const uploadDir = path.resolve("uploads");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        data.images = data.images.map((img: any, index: number) => {
          if (img.image_url && img.image_url.startsWith("data:image")) {
            const matches = img.image_url.match(/^data:(.+);base64,(.+)$/);
            if (matches) {
              const ext = matches[1].split("/")[1];
              const buffer = Buffer.from(matches[2], "base64");
              const filename = `product_${Date.now()}_${index}.${ext}`;
              const filePath = path.join(uploadDir, filename);

              fs.writeFileSync(filePath, buffer);

              img.image_url = `/uploads/${filename}`;
            }
          }
          return {
            ...img,
            order: img.order ?? index,
            active: img.active ?? true,
          };
        });
      }

      const createProductUseCase = container.resolve(CreateProductUseCase);
      const product = await createProductUseCase.execute(data);

      return res.status(201).json(product);
    } catch (error: any) {
      console.error("❌ Erro ao criar produto:", error);
      return res.status(400).json({
        error: error.message || "Erro ao criar produto completo",
      });
    }
  }
}
