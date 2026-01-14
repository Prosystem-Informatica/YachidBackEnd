import { inject, injectable } from "tsyringe";
import { SubEnterprise } from "../../entities/SubEnterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IListSubEnterpriseFilters {
  active?: boolean;
  name?: string;
}

@injectable()
export class ListSubEnterprisesUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(
    enterpriseId: number,
    filters?: IListSubEnterpriseFilters
  ): Promise<SubEnterprise[]> {
    if (!enterpriseId || isNaN(Number(enterpriseId))) {
      throw new AppError("ID da empresa principal inválido", 400);
    }

    const enterprise = await this.enterpriseRepository.findById(enterpriseId);
    if (!enterprise) {
      throw new AppError("Empresa principal não encontrada", 404);
    }

    let subEnterprises =
      await this.enterpriseRepository.findSubEnterprisesByEnterpriseId(
        enterpriseId
      );

    if (filters?.active !== undefined) {
      subEnterprises = subEnterprises.filter(
        (sub) => sub.active === filters.active
      );
    }

    if (filters?.name) {
      const nameLower = filters.name.toLowerCase();
      subEnterprises = subEnterprises.filter((sub) =>
        sub.name.toLowerCase().includes(nameLower)
      );
    }

    subEnterprises.sort((a, b) => a.name.localeCompare(b.name));

    return subEnterprises;
  }
}
