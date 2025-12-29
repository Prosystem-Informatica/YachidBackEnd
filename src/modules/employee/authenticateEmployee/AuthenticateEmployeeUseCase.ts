import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";
import { IEnterpriseRepository } from "../../enterprise/repositories/IEnterpriseRepository";
import { IEmployeeRepository } from "../../employee/repositories/IEmployeeRepository";

interface IRequest {
  identifier: string;
  password: string;
}

interface IResponse {
  user: {
    id: string | number;
    name: string;
    email?: string | null;
    type: "enterprise" | "employee";
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  private onlyDigits(value: string) {
    return value.replace(/\D/g, "");
  }

  async execute({ identifier, password }: IRequest): Promise<IResponse> {
    let user: any = null;
    let userType: "enterprise" | "employee" | null = null;

    const isEmail = identifier.includes("@");

    if (isEmail) {
      user = await this.enterpriseRepository.findByEmail(identifier);
      userType = "enterprise";

      if (!user) {
        user = await this.employeeRepository.findByEmail(identifier);
        userType = "employee";
      }
    } else {
      const digits = this.onlyDigits(identifier);

      user = await this.enterpriseRepository.findByCnpjCpf(digits);
      userType = "enterprise";

      if (!user) {
        user = await this.employeeRepository.findByCnpjCpf(digits);
        userType = "employee";
      }
    }

    if (!user) {
      throw new AppError("Identificador ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Identificador ou senha incorretos", 401);
    }

    const secretKey = process.env.JWT_SECRET || "default_secret";
    const token = sign({ id: user.id, type: userType }, secretKey, {
      subject: user.id.toString(),
      expiresIn: "1d",
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email ?? null,
        type: userType as "enterprise" | "employee",
      },
      token,
    };
  }
}
