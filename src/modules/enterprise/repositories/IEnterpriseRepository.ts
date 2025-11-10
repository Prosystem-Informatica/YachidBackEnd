import { ICreateEnterpriseDTO } from "../dtos/ICreateEnterpriseDTO";
import { Enterprise } from "../entities/Enterprise";

export interface IEnterpriseRepository {
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  findByEmail(email: string): Promise<Enterprise | null>;
  list(): Promise<Enterprise[]>;
}
