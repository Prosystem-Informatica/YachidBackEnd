import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { Customer } from "../entities/Customer";
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { ICustomerRepository, IListFilters } from "./ICustomerRepository";

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
    partner_type,
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
      partner_type,
    });

    await this.repository.save(customer);
    return customer;
  }

  async list(filters?: IListFilters): Promise<Customer[]> {
    const query = this.repository.createQueryBuilder("customer");

    if (filters?.search) {
      query.andWhere(
        "(LOWER(customer.name) LIKE LOWER(:search) OR LOWER(customer.cnpj_cpf) LIKE LOWER(:search) OR LOWER(customer.enterprise_name) LIKE LOWER(:search))",
        { search: `%${filters.search}%` }
      );
    }

    if (filters?.status && filters.status !== "todos") {
      const isActive = filters.status === "ativo";
      query.andWhere("customer.status = :status", { status: isActive });
    }

    if (filters?.partner_type && filters.partner_type !== "todos") {
      query.andWhere("customer.partner_type = :partner_type", {
        partner_type: filters.partner_type,
      });
    }

    query.orderBy("customer.name", "ASC");

    return await query.getMany();
  }

  async listSuppliers(): Promise<Customer[]> {
    const query = this.repository.createQueryBuilder("customer");

    query.where("customer.partner_type IN (:...types)", {
      types: ["fornecedor", "ambos"],
    });

    query.orderBy("customer.name", "ASC");

    return await query.getMany();
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
