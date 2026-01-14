import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { Employee } from "../entities/Employee";
import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";
import { IEmployeeRepository } from "./IEmployeeRepository";

export class EmployeeRepository implements IEmployeeRepository {
  private repository: Repository<Employee>;

  constructor() {
    this.repository = AppDataSource.getRepository(Employee);
  }

  async create({
    name,
    email,
    password,
    phone,
    cnpj_cpf,
    enterpriseId,
    status = true,
    role,
    subEnterpriseIds,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.repository.create({
      name,
      email,
      password,
      phone,
      cnpj_cpf,
      role,
      status,
    });

    await this.repository.save(employee);
    return employee;
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.repository.findOneBy({ email });
  }

  async list(): Promise<Employee[]> {
    return this.repository.find();
  }

  async findByCnpjCpf(cnpj_cpf: string): Promise<Employee | null> {
    return this.repository.findOne({ where: { cnpj_cpf } });
  }
  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    await this.repository.update(id, data);
    const updated = await this.repository.findOne({ where: { id } });
    return updated as Employee;
  }
}
