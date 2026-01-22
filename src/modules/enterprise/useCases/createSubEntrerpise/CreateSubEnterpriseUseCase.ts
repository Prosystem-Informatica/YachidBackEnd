import { inject, injectable } from "tsyringe";
import { SubEnterprise } from "../../entities/SubEnterprise";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateSubEnterpriseDTO } from "../../dtos/ICreateSubEnterpriseDTO";

@injectable()
export class CreateSubEnterpriseUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute({
    enterpriseId,
    name,
    cnpj_cpf,
    address,
    tipo_regime,
    codigo_cidade,
    inscricao_estadual,
    inscricao_municipal,
    contabilidade,
    receita,
  }: ICreateSubEnterpriseDTO): Promise<SubEnterprise> {
    const enterprise = await this.enterpriseRepository.findById(enterpriseId);
    if (!enterprise) {
      throw new AppError("Empresa principal não encontrada", 404);
    }

    const subEnterprises =
      await this.enterpriseRepository.findSubEnterprisesByEnterpriseId(
        enterpriseId
      );

    const duplicateCnpj = subEnterprises.find(
      (sub) => sub.cnpj_cpf === cnpj_cpf
    );

    if (duplicateCnpj) {
      throw new AppError(
        "Já existe uma subempresa com esse CNPJ/CPF nesta empresa",
        400
      );
    }

    const subEnterprise = await this.enterpriseRepository.createSubEnterprise({
      enterprise,
      name,
      cnpj_cpf,
      address: address ?? null,
      tipo_regime: tipo_regime ?? null,
      codigo_cidade: codigo_cidade ?? null,
      inscricao_estadual: inscricao_estadual ?? null,
      inscricao_municipal: inscricao_municipal ?? null,
      contabilidade: contabilidade ?? null,
      receita: receita ?? null,
    });

    return subEnterprise;
  }
}
