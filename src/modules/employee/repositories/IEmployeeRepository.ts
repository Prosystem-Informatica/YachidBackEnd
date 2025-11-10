import { Employee } from "../entities/Employee";
import { ICreateEmployeeDTO } from "../dtos/ICreateEmployeeDTO";

export interface IEmployeeRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | null>;
  list(): Promise<Employee[]>;
}
