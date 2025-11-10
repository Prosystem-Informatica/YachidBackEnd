import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { Employee } from "../../entities/Employee";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ICreateEmployeeDTO } from "../../dtos/ICreateEmployeeDTO";

@injectable()
export class CreateEmployeeUseCase {
  static handle(
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>
  ): unknown {
    throw new Error("Method not implemented.");
  }
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
    cnpj_cpf,
    enterprise_name,
    status,
    role,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employeeAlreadyExists = await this.employeeRepository.findByEmail(
      email
    );

    if (employeeAlreadyExists) {
      throw new AppError("Employee already exists", 400);
    }

    const passwordHash = await hash(password, 8);

    const employee = await this.employeeRepository.create({
      name,
      email,
      password: passwordHash,
      phone,
      cnpj_cpf,
      enterprise_name,
      status,
      role,
    });

    return employee;
  }
}
