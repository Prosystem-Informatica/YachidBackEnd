import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { Customer } from "../../entities/Customer";

@injectable()
export class ListCustomersUseCase {
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customerRepository.list();
    return customers;
  }
}
