import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { AccountsPayable } from './entities/accounts-payable.entity';
import { Repository } from 'typeorm';
import { CreateAccountsPayableDto } from './dto/accounts-payable.dto';
import { UpdateAccountsPayableDto } from './dto/update-accounts-payable.dto';

@Injectable()
export class AccountsPayableService {
  private readonly logger = new Logger(AccountsPayableService.name);

  constructor(
    @InjectRepository(AccountsPayable, EDatabase.YACHID)
    private readonly repository: Repository<AccountsPayable>,
  ) {}

  async getAccountsPayable(partnerId: string): Promise<AccountsPayable> {
    try {
      const result = await this.repository.findOne({
        where: { partner: { id: partnerId } },
      });
      if (!result) {
        throw new NotFoundException('Accounts payable not found');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error getting accounts payable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async createAccountsPayable(
    partnerId: string,
    dto: CreateAccountsPayableDto,
  ): Promise<AccountsPayable> {
    try {
      const dtoAny = { ...dto } as any;
      if (dtoAny.maior_fat) dtoAny.maior_fat = new Date(dtoAny.maior_fat);
      if (dtoAny.primeira_compra) dtoAny.primeira_compra = new Date(dtoAny.primeira_compra);
      if (dtoAny.ultima_compra) dtoAny.ultima_compra = new Date(dtoAny.ultima_compra);
      return this.repository.save({ ...dtoAny, partner: { id: partnerId } });
    } catch (error) {
      this.logger.error(`Error creating accounts payable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateAccountsPayable(
    partnerId: string,
    dto: UpdateAccountsPayableDto,
  ): Promise<AccountsPayable> {
    try {
      const existing = await this.repository.findOne({
        where: { partner: { id: partnerId } },
      });
      if (!existing) {
        throw new NotFoundException('Accounts payable not found');
      }
      const dtoAny = { ...dto } as any;
      if (dtoAny.maior_fat !== undefined) dtoAny.maior_fat = new Date(dtoAny.maior_fat);
      if (dtoAny.primeira_compra !== undefined) dtoAny.primeira_compra = new Date(dtoAny.primeira_compra);
      if (dtoAny.ultima_compra !== undefined) dtoAny.ultima_compra = new Date(dtoAny.ultima_compra);
      Object.assign(existing, dtoAny);
      return this.repository.save(existing);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Error updating accounts payable: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
