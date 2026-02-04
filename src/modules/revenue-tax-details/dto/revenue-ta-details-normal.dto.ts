import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RevenueTaxDetailsNormaAndOverRevenuelDto {
    @IsOptional()
    @IsNotEmpty()
    bc_irpj: string;

    @IsOptional()
    @IsNotEmpty()
    bc_csll: string;

    @IsOptional()
    @IsNotEmpty()
    aliquota_irpj: string;

    @IsOptional()
    @IsNotEmpty()
    aliquota_csll: string;

    @IsOptional()
    @IsNotEmpty()
    ibs_uf: string;

    @IsOptional()
    @IsNotEmpty()
    ibs_mun: string;

    @IsOptional()
    @IsNotEmpty()
    cbs: string;

    @IsOptional()
    @IsNotEmpty()
    over: string;

    @IsOptional()
    @IsNotEmpty()
    value_over: string;
}