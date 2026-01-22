import { inject, injectable } from "tsyringe";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { SubEnterprise } from "../../entities/SubEnterprise";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class UpdateSubEnterpriseUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(
    subId: number,
    data: Partial<SubEnterprise>
  ): Promise<SubEnterprise> {
    const subEnterprise =
      await this.enterpriseRepository.findSubEnterprisesByEnterpriseId(
        data.enterprise?.id ?? 0
      );

    const subToUpdate = subEnterprise.find((sub) => sub.id === subId);

    if (!subToUpdate) {
      throw new AppError("Subempresa não encontrada", 404);
    }

    await this.enterpriseRepository.createSubEnterprise({
      ...subToUpdate,
      ...data,
    });

    const updated =
      await this.enterpriseRepository.findSubEnterprisesByEnterpriseId(
        subToUpdate.enterprise.id
      );

    const updatedSub = updated.find((sub) => sub.id === subId)!;
    return updatedSub;
  }
}
