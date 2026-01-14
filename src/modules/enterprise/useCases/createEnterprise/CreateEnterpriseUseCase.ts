import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Enterprise } from "../../entities/Enterprise";
import { ICreateEnterpriseDTO } from "../../dtos/ICreateEnterpriseDTO";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";
import { IEmployeeRepository } from "../../../employee/repositories/IEmployeeRepository";

@injectable()
export class CreateEnterpriseUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute({
    name,
    status,
    logo,
    cnpj_cpf,
    phone,
    cert_filename,
    cert_password,
    csc_id,
    csc_token,
    environment,
    address,
    tipo_regime,
    codigo_cidade,
    inscricao_estadual,
    inscricao_municipal,
    contabilidade,
    receita,
  }: ICreateEnterpriseDTO): Promise<Enterprise> {
    const cnpjCpfExistsInEnterprise =
      await this.enterpriseRepository.findByCnpjCpf(cnpj_cpf);

    const cnpjCpfExistsInEmployee = await this.employeeRepository.findByCnpjCpf(
      cnpj_cpf
    );

    if (cnpjCpfExistsInEnterprise || cnpjCpfExistsInEmployee) {
      throw new AppError("CNPJ/CPF já está cadastrado em outro usuário", 400);
    }

    const enterprise = await this.enterpriseRepository.create({
      name,
      status,
      logo,
      cnpj_cpf,
      phone,
      cert_filename,
      cert_password,
      csc_id,
      csc_token,
      environment,
      address,
      tipo_regime,
      codigo_cidade,
      inscricao_estadual,
      inscricao_municipal,
      contabilidade,
      receita,
    });

    await this.enterpriseRepository.createSubEnterprise({
      enterprise,
      name: `${enterprise.name} - Matriz`,
      cnpj_cpf: enterprise.cnpj_cpf,
      address: enterprise.address,
      tipo_regime: enterprise.tipo_regime,
      codigo_cidade: enterprise.codigo_cidade,
      inscricao_estadual: enterprise.inscricao_estadual,
      inscricao_municipal: enterprise.inscricao_municipal,
      contabilidade: enterprise.contabilidade,
      receita: enterprise.receita,
    });

    return enterprise;
  }
}
