import { inject, injectable } from "tsyringe";
import { Enterprise } from "../../entities/Enterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";

@injectable()
export class ListEnterprisesUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute(): Promise<Enterprise[]> {
    const enterprises = await this.enterpriseRepository.list();
    return enterprises;
  }
}
