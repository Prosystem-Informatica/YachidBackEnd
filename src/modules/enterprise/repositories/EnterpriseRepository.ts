import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { IEnterpriseRepository } from "./IEnterpriseRepository";
import { Enterprise } from "../entities/Enterprise";
import { SubEnterprise } from "../entities/SubEnterprise";
import { ICreateEnterpriseDTO } from "../dtos/ICreateEnterpriseDTO";

export class EnterpriseRepository implements IEnterpriseRepository {
  private repository: Repository<Enterprise>;
  private subRepository: Repository<SubEnterprise>;

  constructor() {
    this.repository = AppDataSource.getRepository(Enterprise);
    this.subRepository = AppDataSource.getRepository(SubEnterprise);
  }

  async create(data: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterprise = this.repository.create({
      name: data.name,
      status: data.status ?? true,
      logo: data.logo ?? null,
      cnpj_cpf: data.cnpj_cpf,
      phone: data.phone ?? null,
      environment: data.environment ?? "2",
      address: data.address ?? null,
      tipo_regime: data.tipo_regime ?? null,
      codigo_cidade: data.codigo_cidade ?? null,
      inscricao_estadual: data.inscricao_estadual ?? null,
      inscricao_municipal: data.inscricao_municipal ?? null,
      contabilidade: data.contabilidade ?? null,
      receita: data.receita ?? null,
    });

    await this.repository.save(enterprise);
    return enterprise;
  }

  async createSubEnterprise(
    data: Partial<SubEnterprise>
  ): Promise<SubEnterprise> {
    const sub = this.subRepository.create(data);
    await this.subRepository.save(sub);
    return sub;
  }

  async list(): Promise<Enterprise[]> {
    return this.repository.find();
  }

  async listWithSubEnterprises(): Promise<Enterprise[]> {
    return this.repository.find({ relations: ["subEnterprises"] });
  }

  async findById(id: number): Promise<Enterprise | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByIdWithSubEnterprises(id: number): Promise<Enterprise | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["subEnterprises"],
    });
  }

  async findSubEnterprisesByEnterpriseId(
    enterpriseId: number,
    subEnterpriseId?: number
  ): Promise<SubEnterprise[]> {
    const where: any = { enterprise: { id: enterpriseId } };
    if (subEnterpriseId) {
      where.id = subEnterpriseId;
    }
    return this.subRepository.find({ where });
  }

  async findByCnpjCpf(cnpj_cpf: string): Promise<Enterprise | null> {
    return this.repository.findOne({ where: { cnpj_cpf } });
  }

  async update(id: number, data: Partial<Enterprise>): Promise<Enterprise> {
    await this.repository.update(id, data);
    return (await this.repository.findOne({ where: { id } })) as Enterprise;
  }
}
