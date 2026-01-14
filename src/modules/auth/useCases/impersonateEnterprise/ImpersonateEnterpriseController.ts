import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { EnterpriseRepository } from "../../../enterprise/repositories/EnterpriseRepository";
import { AppError } from "../../../../shared/errors/AppError";

export class ImpersonateEnterpriseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { enterpriseId } = req.body;

    const enterpriseRepository = new EnterpriseRepository();
    const enterprise = await enterpriseRepository.findById(enterpriseId);

    if (!enterprise) {
      throw new AppError("Empresa não encontrada", 404);
    }

    const token = sign(
      { enterpriseId: enterprise.id, type: "enterprise" },
      process.env.JWT_SECRET!,
      {
        subject: String(enterprise.id),
        expiresIn: "1d",
      }
    );

    return res.json({
      token,
      enterprise,
    });
  }
}
