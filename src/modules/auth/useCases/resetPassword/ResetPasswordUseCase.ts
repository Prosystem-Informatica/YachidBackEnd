import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { PasswordResetRepository } from "../../repositories/PasswordResetRepository";
import { IEmployeeRepository } from "../../../employee/repositories/IEmployeeRepository";

interface IRequest {
  identifier: string;
  code: string;
  new_password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,

    private passwordResetRepository: PasswordResetRepository = new PasswordResetRepository()
  ) {}

  private normalizeIdentifier(identifier: string): string {
    return identifier.includes("@")
      ? identifier.trim().toLowerCase()
      : identifier.replace(/\D/g, "");
  }

  async execute({ identifier, code, new_password }: IRequest): Promise<void> {
    const normalized = this.normalizeIdentifier(identifier);

    const record = await this.passwordResetRepository.findLatestByIdentifier(
      normalized
    );

    if (!record || record.code !== code) {
      throw new AppError("Código inválido", 400);
    }

    if (new Date(record.expires_at) < new Date()) {
      throw new AppError("Código expirado", 400);
    }

    const hashedPassword = await hash(new_password, 8);

    const user = identifier.includes("@")
      ? await this.employeeRepository.findByEmail(normalized)
      : await this.employeeRepository.findByCnpjCpf(normalized);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await this.employeeRepository.update(user.id, { password: hashedPassword });

    await this.passwordResetRepository.deleteByIdentifier(normalized);
  }
}
