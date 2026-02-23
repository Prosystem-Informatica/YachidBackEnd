import { PartialType } from '@nestjs/mapped-types';
import { CreatePartnerCreditConfigDto } from './partner-credit-config.dto';

export class UpdatePartnerCreditConfigDto extends PartialType(CreatePartnerCreditConfigDto) {}
