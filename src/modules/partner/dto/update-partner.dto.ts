import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { PartnerPersonType, PartnerStatus, PartnerType } from 'src/core/enum/enums';

export class UpdatePartnerDto {
  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  ie_rg?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  fantasy_name?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('BR')
  main_phone?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('BR')
  secondary_phone?: string;

  @IsOptional()
  @IsString()
  cellphone?: string;

  @IsOptional()
  @IsEnum(PartnerPersonType)
  person_type?: PartnerPersonType;

  @IsOptional()
  @IsEnum(PartnerType)
  partner_type?: PartnerType;

  @IsOptional()
  @IsString()
  suframa?: string;

  @IsOptional()
  @IsString()
  business_sector?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email_nfe?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  site?: string;

  @IsOptional()
  @IsEnum(PartnerStatus)
  status?: PartnerStatus;

  @IsOptional()
  @IsString()
  accounting_account?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsBoolean()
  provision?: boolean;

  @IsOptional()
  @IsBoolean()
  fixed_expenses?: boolean;

  @IsOptional()
  @IsUUID()
  groupId?: string;
}
