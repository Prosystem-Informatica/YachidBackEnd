import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountsReceivableDto } from './accounts-receivable.dto';

export class UpdateAccountsReceivableDto extends PartialType(CreateAccountsReceivableDto) {}
