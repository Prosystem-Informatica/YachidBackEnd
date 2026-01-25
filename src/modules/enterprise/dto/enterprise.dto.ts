import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import * as enterpriseEntity from "../entities/enterprise.entity";
import { CreateAddressDto } from "src/modules/address/dto/address.dto";

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
    address!: CreateAddressDto;

}