import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { AccountsReceivable } from './entities/accounts-receivable';
import { Repository } from 'typeorm';
import { CreateAccountsReceivableDto } from './dto/accounts-receivable.dto';
import { UpdateAccountsReceivableDto } from './dto/update-accounts-receivable.dto';

@Injectable()
export class AccountsReceivableService {
  private readonly logger = new Logger(AccountsReceivableService.name);

  constructor(
    @InjectRepository(AccountsReceivable, EDatabase.YACHID)
    private readonly repository: Repository<AccountsReceivable>,
  ) {}

  async getAccountsReceivable(partnerId: string): Promise<AccountsReceivable> {
    try {
      const result = await this.repository.findOne({
        where: { partner: { id: partnerId } },
      });
      if (!result) {
        throw new NotFoundException('Accounts receivable not found');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error getting accounts receivable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async createAccountsReceivable(
    partnerId: string,
    dto: CreateAccountsReceivableDto,
  ): Promise<AccountsReceivable> {
    try {
      const dtoAny = { ...dto } as any;
      if (dtoAny.maior_fat) dtoAny.maior_fat = new Date(dtoAny.maior_fat);
      if (dtoAny.primeira_compra) dtoAny.primeira_compra = new Date(dtoAny.primeira_compra);
      if (dtoAny.ultima_compra) dtoAny.ultima_compra = new Date(dtoAny.ultima_compra);
      return this.repository.save({ ...dtoAny, partner: { id: partnerId } });
    } catch (error) {
      this.logger.error(`Error creating accounts receivable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateAccountsReceivable(
    partnerId: string,
    dto: UpdateAccountsReceivableDto,
  ): Promise<AccountsReceivable> {
    try {
      const existing = await this.repository.findOne({
        where: { partner: { id: partnerId } },
      });
      if (!existing) {
        throw new NotFoundException('Accounts receivable not found');
      }
      const dtoAny = { ...dto } as any;
      if (dtoAny.maior_fat !== undefined) dtoAny.maior_fat = new Date(dtoAny.maior_fat);
      if (dtoAny.primeira_compra !== undefined) dtoAny.primeira_compra = new Date(dtoAny.primeira_compra);
      if (dtoAny.ultima_compra !== undefined) dtoAny.ultima_compra = new Date(dtoAny.ultima_compra);
      Object.assign(existing, dtoAny);
      return this.repository.save(existing);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error updating accounts receivable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
