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
    subEnterpriseIds = [],
    status = true,
    role,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.repository.create({
      name,
      email,
      password,
      phone: phone || null,
      cnpj_cpf: cnpj_cpf || null,
      role,
      status,
      enterprise: { id: enterpriseId },
    });

    if (subEnterpriseIds.length > 0) {
      employee.subEnterprises = subEnterpriseIds.map((id) => ({ id } as any));
    }

    return this.repository.save(employee);
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.repository.findOne({
      where: { email },
      relations: ["enterprise", "subEnterprises"],
    });
  }

  async findByCnpjCpf(cnpj_cpf: string): Promise<Employee | null> {
    return this.repository.findOne({
      where: { cnpj_cpf },
      relations: ["enterprise", "subEnterprises"],
    });
  }

  async findByEmailMinimal(email: string): Promise<Employee | null> {
    return this.repository.findOne({
      where: { email },
      select: ["id", "email", "password", "status", "role"],
    });
  }

  async findByCnpjCpfMinimal(cnpj_cpf: string): Promise<Employee | null> {
    return this.repository.findOne({
      where: { cnpj_cpf },
      select: ["id", "email", "password", "status", "role"],
    });
  }

  async list(): Promise<Employee[]> {
    return this.repository.find({ relations: ["enterprise", "subEnterprises"] });
  }

  async update(
    id: string,
    data: Partial<Employee> & { subEnterpriseIds?: number[] }
  ): Promise<Employee> {
    const { subEnterpriseIds, ...otherData } = data;

    if (Object.keys(otherData).length > 0) {
      await this.repository.update(id, otherData);
    }

    if (subEnterpriseIds) {
      const employee = await this.repository.findOne({ where: { id }, relations: ["subEnterprises"] });
      if (!employee) throw new Error("Employee não encontrado");

      employee.subEnterprises = subEnterpriseIds.map((eid) => ({ id: eid } as any));
      await this.repository.save(employee);
      return employee;
    }

    const updated = await this.repository.findOne({
      where: { id },
      relations: ["enterprise", "subEnterprises"],
    });

    if (!updated) throw new Error("Employee não encontrado");
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findOne(options: any): Promise<Employee | null> {
    return this.repository.findOne(options);
  }
}
