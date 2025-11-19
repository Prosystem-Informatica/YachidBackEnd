import { Customer } from "../entities/Customer";
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";

export interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByName(name: string): Promise<Customer | null>;
  findById(id: number): Promise<Customer | null>;
  list(): Promise<Customer[]>;
}
