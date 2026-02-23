import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountsReceivableService } from './accounts-receivable.service';
import { CreateAccountsReceivableDto } from './dto/accounts-receivable.dto';
import { UpdateAccountsReceivableDto } from './dto/update-accounts-receivable.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('accounts-receivable')
@UseGuards(AuthGuard)
export class AccountsReceivableController {
  constructor(private readonly accountsReceivableService: AccountsReceivableService) {}

  @Get(':partnerId')
  async getAccountsReceivable(@Param('partnerId') partnerId: string) {
    return this.accountsReceivableService.getAccountsReceivable(partnerId);
  }

  @Post(':partnerId')
  async createAccountsReceivable(
    @Param('partnerId') partnerId: string,
    @Body() dto: CreateAccountsReceivableDto,
  ) {
    return this.accountsReceivableService.createAccountsReceivable(partnerId, dto);
  }

  @Patch(':partnerId')
  async updateAccountsReceivable(
    @Param('partnerId') partnerId: string,
    @Body() dto: UpdateAccountsReceivableDto,
  ) {
    return this.accountsReceivableService.updateAccountsReceivable(partnerId, dto);
  }
}
