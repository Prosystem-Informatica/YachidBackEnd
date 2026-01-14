import { inject, injectable } from "tsyringe";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { Enterprise } from "../../entities/Enterprise";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class UpdateEnterpriseUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(id: number, data: Partial<Enterprise>): Promise<Enterprise> {
    const enterpriseExists = await this.enterpriseRepository.findById(id);

    if (!enterpriseExists) {
      throw new AppError("Empresa não encontrada", 404);
    }

    const updatedEnterprise = await this.enterpriseRepository.update(id, data);

    return updatedEnterprise;
  }
}
