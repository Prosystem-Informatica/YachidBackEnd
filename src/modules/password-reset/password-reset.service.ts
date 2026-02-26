import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { PasswordReset } from './entities/password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset, EDatabase.YACHID)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async create(identifier: string): Promise<PasswordReset> {
    const code = this.generateCode();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    await this.passwordResetRepository.delete({ identifier });

    return this.passwordResetRepository.save({
      identifier,
      code,
      expires_at: expiresAt,
    });
  }

  async findValid(identifier: string, code: string): Promise<PasswordReset | null> {
    const reset = await this.passwordResetRepository.findOne({
      where: { identifier, code },
    });
    if (!reset || new Date() > reset.expires_at) {
      return null;
    }
    return reset;
  }

  async invalidate(identifier: string): Promise<void> {
    await this.passwordResetRepository.delete({ identifier });
  }
}
