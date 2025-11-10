import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Enterprise } from "../../entities/Enterprise";
import { ICreateEnterpriseDTO } from "../../dtos/ICreateEnterpriseDTO";
import { IEnterpriseRepository } from "../../repositories/IEnterpriseRepository";

@injectable()
export class CreateEnterpriseUseCase {
  static handle(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>
  ): unknown {
    throw new Error("Method not implemented.");
  }
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository
  ) {}

  async execute({
    name,
    email,
    password,
    status,
    logo,
    cnpj_cpf,
    branches,
    phone,
  }: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterpriseAlreadyExists = await this.enterpriseRepository.findByEmail(
      email
    );

    if (enterpriseAlreadyExists) {
      throw new AppError("Empresa já existe", 400);
    }

    const passwordHash = await hash(password, 8);

    const enterprise = await this.enterpriseRepository.create({
      name,
      email,
      password: passwordHash,
      status,
      logo,
      cnpj_cpf,
      branches,
      phone,
    });

    return enterprise;
  }
}
