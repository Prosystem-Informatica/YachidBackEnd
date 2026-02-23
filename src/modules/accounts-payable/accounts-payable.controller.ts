import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccountsPayableService } from './accounts-payable.service';
import { CreateAccountsPayableDto } from './dto/accounts-payable.dto';
import { UpdateAccountsPayableDto } from './dto/update-accounts-payable.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('accounts-payable')
@UseGuards(AuthGuard)
export class AccountsPayableController {
  constructor(private readonly accountsPayableService: AccountsPayableService) {}

  @Get(':partnerId')
  async getAccountsPayable(@Param('partnerId') partnerId: string) {
    return this.accountsPayableService.getAccountsPayable(partnerId);
  }

  @Post(':partnerId')
  async createAccountsPayable(
    @Param('partnerId') partnerId: string,
    @Body() dto: CreateAccountsPayableDto,
  ) {
    return this.accountsPayableService.createAccountsPayable(partnerId, dto);
  }

  @Patch(':partnerId')
  async updateAccountsPayable(
    @Param('partnerId') partnerId: string,
    @Body() dto: UpdateAccountsPayableDto,
  ) {
    return this.accountsPayableService.updateAccountsPayable(partnerId, dto);
  }
}
