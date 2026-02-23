import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { BankService } from './bank.service';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bank> {
    return this.bankService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDto: CreateBankDto): Promise<Bank> {
    return this.bankService.create(createDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBankDto,
  ): Promise<Bank> {
    return this.bankService.update(id, updateDto);
  }
}
