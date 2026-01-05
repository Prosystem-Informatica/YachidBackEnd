import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerUseCase } from "./createCustomerUseCase";
import { CustomerRepository } from "../../repositories/CustomerRepository";

export class CreateCustomerController {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    let {
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit,
      address,
      person_type,
      inscricao_estadual,
      partner_type,
    } = req.body;

    if (address && typeof address === "object") {
      address = JSON.stringify(address);
    }

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      name,
      email,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      restriction,
      credit,
      address,
      person_type,
      inscricao_estadual,
      partner_type,
    });

    return res.status(201).json(customer);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    if (data.address && typeof data.address === "object") {
      data.address = JSON.stringify(data.address);
    }

    const customerUpdated = await this.customerRepository.update(
      Number(id),
      data
    );

    return res.json(customerUpdated);
  }
}
