import { Type } from 'class-transformer';
import { IsString, IsEmail, IsPhoneNumber, IsBoolean, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { PartnerPersonType, PartnerStatus, PartnerType } from 'src/core/enum/enums';
import { CreateAddressDto } from 'src/modules/address/dto/address.dto';
import { CreatePaymentAddressDto } from 'src/modules/payment-address/dto/payment-address.dto';

export class PartnerDto {

    @IsString()
    codigo: string;

    @IsString()
    document: string;

    @IsString()
    ie_rg: string;

    @IsString()
    name: string;

    @IsString()
    fantasy_name: string;

    @IsString()
    @IsPhoneNumber('BR')
    main_phone: string;

    @IsString()
    @IsPhoneNumber('BR')
    secondary_phone: string;

    @IsString()
    cellphone: string;

    @IsEnum(PartnerPersonType)
    person_type: PartnerPersonType;

    @IsString()
    suframa: string;

    @IsString()
    business_sector: string;

    @IsString()
    @IsEmail()
    email_nfe: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    site: string;

    @IsString()
    status: PartnerStatus; 

    @IsString()
    @IsOptional()
    accounting_account: string;

    @IsString()
    type: string;

    @IsBoolean()
    provision: boolean;

    @IsBoolean()
    fixed_expenses: boolean;

    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ValidateNested()
    @Type(() => CreatePaymentAddressDto)
    payment_address: CreatePaymentAddressDto;

}