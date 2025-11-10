import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { Customer } from "../../entities/Customer";

@injectable()
export class CreateCustomerUseCase {
  static handle(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>
  ): unknown {
    throw new Error(" Metodo não implementado.");
  }
  constructor(
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    name,
    email,
    phone,
    cnpj_cpf,
    enterprise_name,
    status,
    restriction,
    credit,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customerAlreadyExists = await this.customerRepository.findByName(
      name
    );

    if (customerAlreadyExists) {
      throw new AppError("Cliente já existe", 400);
    }

    const customer = await this.customerRepository.create({
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit,
    });

    return customer;
  }
}
