import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";
import { IEmployeeRepository } from "../repositories/IEmployeeRepository";

interface IRequest {
  identifier: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    enterprise_id: number;
    sub_enterprises_access?: number[] | null;
  };
  token: string;
}

@injectable()
export class AuthenticateEmployeeUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {}

  private onlyDigits(value: string): string {
    return value.replace(/\D/g, "");
  }

  async execute({ identifier, password }: IRequest): Promise<IResponse> {
    let user = null;
    const isEmail = identifier.includes("@");

    if (isEmail) {
      user = await this.employeeRepository.findByEmail(identifier);
    } else {
      const digits = this.onlyDigits(identifier);
      user = await this.employeeRepository.findByCnpjCpf(digits);
    }

    if (!user) {
      throw new AppError("E-mail, CPF ou senha incorretos", 401);
    }

    if (!user.status) {
      throw new AppError("Usuário inativo", 403);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("E-mail, CPF ou senha incorretos", 401);
    }

    const secretKey = process.env.JWT_SECRET || "default_secret";

    const subEnterpriseIds = user.subEnterprises?.map((e) => e.id) || [];

    const token = sign(
      { id: user.id, enterprise_id: user.enterprise.id, role: user.role },
      secretKey,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        enterprise_id: user.enterprise.id,
        sub_enterprises_access:
          subEnterpriseIds.length > 0 ? subEnterpriseIds : null,
      },
      token,
    };
  }
}
