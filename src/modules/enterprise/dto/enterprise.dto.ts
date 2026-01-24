import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import * as enterpriseEntity from "../entities/enterprise.entity";
import { CreateAddressDto } from "src/modules/address/dto/address.dto";

export class CreateEnterpriseDto {

    @IsNotEmpty()
    document!: string;

    @IsNotEmpty()
    social_reason: string;

    @IsNotEmpty()
    fantasy_name: string;

    @IsNotEmpty()
    @IsEnum(enterpriseEntity.EnterpriseStatus)
    status: enterpriseEntity.EnterpriseStatus;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    website?: string;

    @IsNotEmpty()
    address!: CreateAddressDto;
}