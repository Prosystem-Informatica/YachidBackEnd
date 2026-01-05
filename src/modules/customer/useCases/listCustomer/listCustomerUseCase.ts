import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { Customer } from "../../entities/Customer";

interface IListFilters {
  search?: string;
  status?: string;
  partner_type?: string;
}

@injectable()
export class ListCustomersUseCase {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(filters?: IListFilters): Promise<Customer[]> {
    return this.customerRepository.list(filters);
  }
}
