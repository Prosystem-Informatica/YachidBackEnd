import { Employee } from "../entities/Employee";
import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

export interface IEmployeeRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | null>;
  findByCnpjCpf(cnpj_cpf: string): Promise<Employee | null>;
  list(): Promise<Employee[]>;
  update(
    id: string,
    data: Partial<Employee> & { subEnterpriseIds?: number[] }
  ): Promise<Employee>;
  delete(id: string): Promise<void>;
  getSubEnterprises(
    employeeId: string
  ): Promise<{ id: number; name?: string }[]>;
}
