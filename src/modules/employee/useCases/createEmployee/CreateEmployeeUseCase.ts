import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { Employee } from "../../entities/Employee";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";
import { IEnterpriseRepository } from "../../../enterprise/repositories/IEnterpriseRepository";

@injectable()
export class CreateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    cnpj_cpf,
    enterpriseId,
    subEnterpriseIds = [],
    status = true,
    role,
  }: ICreateEmployeeDTO): Promise<Employee> {
    if (!name || !email || !password || !enterpriseId || !role) {
      throw new AppError(
        "Campos obrigatórios faltando: name, email, password, enterpriseId, role",
        400
      );
    }

    const emailExists = await this.employeeRepository.findByEmail(email);
    if (emailExists) throw new AppError("E-mail já cadastrado", 400);

    if (cnpj_cpf) {
      const cpfExistsInEmployee = await this.employeeRepository.findByCnpjCpf(
        cnpj_cpf
      );
      const cpfExistsInEnterprise =
        await this.enterpriseRepository.findByCnpjCpf(cnpj_cpf);

      if (cpfExistsInEmployee || cpfExistsInEnterprise) {
        throw new AppError("CPF/CNPJ já cadastrado em outro usuário", 400);
      }
    }

    const passwordHash = await hash(password, 8);

    const employee = await this.employeeRepository.create({
      name,
      email,
      password: passwordHash,
      phone,
      cnpj_cpf,
      enterpriseId,
      subEnterpriseIds,
      status,
      role,
    });

    return employee;
  }
}
