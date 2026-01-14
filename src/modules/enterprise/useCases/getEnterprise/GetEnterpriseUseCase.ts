import { inject, injectable } from "tsyringe";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { Enterprise } from "../../entities/Enterprise";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class GetEnterpriseUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(id: number): Promise<Enterprise> {
    const enterprise =
      await this.enterpriseRepository.findByIdWithSubEnterprises(id);

    if (!enterprise) {
      throw new AppError("Empresa não encontrada", 404);
    }

    return enterprise;
  }
}
