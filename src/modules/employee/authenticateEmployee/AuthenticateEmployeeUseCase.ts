import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";
import { AppError } from "../../../shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  Employee: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const employee = await this.employeeRepository.findByEmail(email);

    if (!employee) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, employee.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }

    const secretKey = process.env.JWT_SECRET || "default_secret";
    const token = sign({}, secretKey, {
      subject: employee.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      Employee: {
        name: employee.name,
        email: employee.email,
      },
    };

    return tokenReturn;
  }
}
