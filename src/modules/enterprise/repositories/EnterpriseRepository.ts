import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { IEnterpriseRepository } from "./IEnterpriseRepository";
import { Enterprise } from "../entities/Enterprise";
import { ICreateEnterpriseDTO } from "../dtos/ICreateEnterpriseDTO";

export class EnterpriseRepository implements IEnterpriseRepository {
  private repository: Repository<Enterprise>;

  constructor() {
    this.repository = AppDataSource.getRepository(Enterprise);
  }

  async create({
    name,
    email,
    password,
    status,
    logo,
    cnpj_cpf,
    branches,
    phone,
  }: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterprise = this.repository.create({
      name,
      email,
      password,
      status,
      logo,
      cnpj_cpf,
      branches,
      phone,
    });
    await this.repository.save(enterprise);
    return enterprise;
  }

  async findByEmail(email: string): Promise<Enterprise | null> {
    return this.repository.findOneBy({ email });
  }

  async list(): Promise<Enterprise[]> {
    return this.repository.find();
  }
}
