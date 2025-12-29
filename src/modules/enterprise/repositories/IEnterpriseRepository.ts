import { ICreateEnterpriseDTO } from "../dtos/ICreateEnterpriseDTO";
import { Enterprise } from "../entities/Enterprise";

export interface IEnterpriseRepository {
  update(id: number, data: Partial<Enterprise>): Promise<Enterprise>;
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  findByEmail(email: string): Promise<Enterprise | null>;
  findById(id: number): Promise<Enterprise | null>;
  findByCnpjCpf(cnpj_cpf: string): Promise<Enterprise | null>;
  list(): Promise<Enterprise[]>;
}
