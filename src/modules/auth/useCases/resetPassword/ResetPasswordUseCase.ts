import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { PasswordResetRepository } from "../../repositories/PasswordResetRepository";
import { IEnterpriseRepository } from "../../../enterprise/repositories/IEnterpriseRepository";
import { IEmployeeRepository } from "../../../employee/repositories/IEmployeeRepository";

interface IRequest {
  identifier: string;
  code: string;
  new_password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("EnterpriseRepository")
    private enterpriseRepository: IEnterpriseRepository,

    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    private passwordResetRepository: PasswordResetRepository = new PasswordResetRepository()
  ) {}

  async execute({ identifier, code, new_password }: IRequest): Promise<void> {
    const normalized = identifier.includes("@")
      ? identifier
      : identifier.replace(/\D/g, "");
    const record = await this.passwordResetRepository.findLatestByIdentifier(
      normalized
    );

    if (!record || record.code !== code)
      throw new AppError("Código inválido", 400);
    if (new Date(record.expires_at) < new Date())
      throw new AppError("Código expirado", 400);

    const hashed = await hash(new_password, 8);

    const user =
      (await this.enterpriseRepository.findByEmail(normalized)) ||
      (await this.employeeRepository.findByEmail(normalized)) ||
      (await this.enterpriseRepository.findByCnpjCpf(normalized)) ||
      (await this.employeeRepository.findByCnpjCpf(normalized));

    if (!user) throw new AppError("Usuário não encontrado", 404);

    if ("id" in user && "environment" in user) {
      await this.enterpriseRepository.update(user.id, { password: hashed });
    } else {
      await this.employeeRepository.update(user.id, { password: hashed });
    }

    await this.passwordResetRepository.deleteByIdentifier(normalized);
  }
}
