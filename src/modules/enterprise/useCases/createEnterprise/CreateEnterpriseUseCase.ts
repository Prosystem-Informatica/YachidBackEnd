import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
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
    email,
    password,
    status,
    logo,
    cnpj_cpf,
    branches,
    phone,
  }: ICreateEnterpriseDTO): Promise<Enterprise> {
    const emailExistsInEnterprise = await this.enterpriseRepository.findByEmail(
      email
    );
    const emailExistsInEmployee = await this.employeeRepository.findByEmail(
      email
    );

    if (emailExistsInEnterprise || emailExistsInEmployee) {
      throw new AppError("E-mail já está em uso por outro usuário", 400);
    }

    const cnpjCpfExistsInEnterprise =
      await this.enterpriseRepository.findByCnpjCpf(cnpj_cpf);
    const cnpjCpfExistsInEmployee = await this.employeeRepository.findByCnpjCpf(
      cnpj_cpf
    );

    if (cnpjCpfExistsInEnterprise || cnpjCpfExistsInEmployee) {
      throw new AppError("CNPJ/CPF já está cadastrado em outro usuário", 400);
    }

    const passwordHash = await hash(password, 8);

    const enterprise = await this.enterpriseRepository.create({
      name,
      email,
      password: passwordHash,
      status,
      logo,
      cnpj_cpf,
      branches,
      phone,
    });

    return enterprise;
  }
}
