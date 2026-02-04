import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import * as enterpriseEntity from "../entities/enterprise.entity";
import { CreateAddressDto } from "src/modules/address/dto/address.dto";
import { TaxRegimeDto } from "src/modules/tax-regime/dto/tax-regime.dto";
import { RevenueTaxDetailsDto } from "src/modules/revenue-tax-details/dto/revenue-tax-details.dto";

export class CreateEnterpriseDto {

    @IsNotEmpty({ message: 'Defina o documento da empresa' })
    document!: string;

    @IsNotEmpty({ message: 'Defina a razão social da empresa' })
    social_reason: string;

    @IsNotEmpty({ message: 'Defina o nome fantasia da empresa' })
    fantasy_name: string;

    @IsNotEmpty({ message: 'Defina o status da empresa' })
    @IsEnum(enterpriseEntity.EnterpriseStatus)
    status: enterpriseEntity.EnterpriseStatus;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    website?: string;

    @IsNotEmpty({ message: 'Defina o endereço da empresa' })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address!: CreateAddressDto;

    @IsNotEmpty({ message: 'Defina o regime tributário da empresa' })
    @ValidateNested()
    @Type(() => TaxRegimeDto)
    tax_regime: TaxRegimeDto;

    @IsNotEmpty({ message: 'Defina os detalhes de tributação da empresa' })
    revenueTaxDetails: RevenueTaxDetailsDto;

}