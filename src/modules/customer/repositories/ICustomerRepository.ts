import { Customer } from "../entities/Customer";
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";

export interface IListFilters {
  search?: string;
  status?: string;
  partner_type?: string;
}

export interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findByName(name: string): Promise<Customer | null>;
  findById(id: number): Promise<Customer | null>;
  list(filters?: IListFilters): Promise<Customer[]>;
}
