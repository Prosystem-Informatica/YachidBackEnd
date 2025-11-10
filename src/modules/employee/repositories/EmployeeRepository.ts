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
    enterprise_name,
    status,
    role,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.repository.create({
      name,
      email,
      password,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      role,
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
}
