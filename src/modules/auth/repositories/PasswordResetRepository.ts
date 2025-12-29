import { Repository } from "typeorm";
import { AppDataSource } from "../../../config/database";
import { PasswordReset } from "../entities/PasswordReset";

export class PasswordResetRepository {
  private repository: Repository<PasswordReset>;

  constructor() {
    this.repository = AppDataSource.getRepository(PasswordReset);
  }

  async createReset(
    identifier: string,
    code: string,
    expires_at: Date
  ): Promise<PasswordReset> {
    const reset = this.repository.create({ identifier, code, expires_at });
    return await this.repository.save(reset);
  }

  async findLatestByIdentifier(
    identifier: string
  ): Promise<PasswordReset | null> {
    return await this.repository.findOne({
      where: { identifier },
      order: { created_at: "DESC" },
    });
  }

  async deleteByIdentifier(identifier: string): Promise<void> {
    await this.repository.delete({ identifier });
  }
}
