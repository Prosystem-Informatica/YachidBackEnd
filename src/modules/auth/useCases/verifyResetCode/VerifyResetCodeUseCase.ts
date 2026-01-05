import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { PasswordResetRepository } from "../../repositories/PasswordResetRepository";

@injectable()
export class VerifyResetCodeUseCase {
  private passwordResetRepository: PasswordResetRepository;

  constructor() {
    this.passwordResetRepository = new PasswordResetRepository();
  }

  async execute(identifier: string, code: string): Promise<void> {
    const normalized = identifier.includes("@")
      ? identifier
      : identifier.replace(/\D/g, "");

    const record = await this.passwordResetRepository.findLatestByIdentifier(
      normalized
    );

    if (!record || record.code !== code) {
      throw new AppError("Código inválido.", 400);
    }

    if (new Date(record.expires_at) < new Date()) {
      throw new AppError("Código expirado.", 400);
    }
  }
}
