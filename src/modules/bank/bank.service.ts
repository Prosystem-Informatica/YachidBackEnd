import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);

  constructor(
    @InjectRepository(Bank, EDatabase.YACHID)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async findAll(): Promise<Bank[]> {
    try {
      return this.bankRepository.find({
        order: { nome: 'ASC' },
      });
    } catch (error) {
      this.logger.error(`Error getting banks: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Bank> {
    try {
      const bank = await this.bankRepository.findOne({
        where: { id },
      });
      if (!bank) {
        throw new BadRequestException('Bank not found');
      }
      return bank;
    } catch (error) {
      this.logger.error(`Error getting bank: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async create(createDto: CreateBankDto): Promise<Bank> {
    try {
      this.logger.log('Creating bank');
      const bank = this.bankRepository.create(createDto);
      return this.bankRepository.save(bank);
    } catch (error) {
      this.logger.error(`Error creating bank: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateDto: UpdateBankDto): Promise<Bank> {
    try {
      this.logger.log(`Updating bank ${id}`);
      await this.bankRepository.findOneOrFail({ where: { id } });
      await this.bankRepository.update(id, updateDto);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Error updating bank: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
