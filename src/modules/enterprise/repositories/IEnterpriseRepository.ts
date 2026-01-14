import { ICreateEnterpriseDTO } from "../dtos/ICreateEnterpriseDTO";
import { Enterprise } from "../entities/Enterprise";
import { SubEnterprise } from "../entities/SubEnterprise";

export interface IEnterpriseRepository {
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  update(id: number, data: Partial<Enterprise>): Promise<Enterprise>;
  findById(id: number): Promise<Enterprise | null>;
  findByCnpjCpf(cnpj_cpf: string): Promise<Enterprise | null>;
  list(): Promise<Enterprise[]>;
  listWithSubEnterprises(): Promise<Enterprise[]>;
  findByIdWithSubEnterprises(id: number): Promise<Enterprise | null>;
  createSubEnterprise(data: Partial<SubEnterprise>): Promise<SubEnterprise>;
  findSubEnterprisesByEnterpriseId(
    enterpriseId: number
  ): Promise<SubEnterprise[]>;
}
