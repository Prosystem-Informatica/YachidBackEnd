import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { Customer } from "../entities/Customer";
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { ICustomerRepository } from "./ICustomerRepository";

export class CustomerRepository implements ICustomerRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = AppDataSource.getRepository(Customer);
  }

  async create({
    name,
    email,
    phone,
    cnpj_cpf,
    enterprise_name,
    status,
    restriction,
    credit,
    inscricao_estadual,
    person_type,
    address,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit: credit ?? undefined,
      address,
      person_type,
      inscricao_estadual,
    });

    await this.repository.save(customer);
    return customer;
  }

  async list(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ id });
    return customer || null;
  }

  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.repository.findOneBy({ name });
    return customer || null;
  }

  async update(id: number, data: Partial<Customer>): Promise<Customer> {
    await this.repository.update(id, data);
    return (await this.repository.findOne({ where: { id } })) as Customer;
  }
}
