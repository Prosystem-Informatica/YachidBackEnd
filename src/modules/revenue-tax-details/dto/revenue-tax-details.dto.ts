import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RevenueTaxDetailsDto {
    @IsOptional()
    bc_irpj: string;

    @IsOptional()
    bc_csll: string;

    @IsOptional()
    aliquota_irpj: string;

    @IsOptional()
    aliquota_csll: string;

    @IsOptional()
    ibs_uf: string;

    @IsOptional()
    ibs_mun: string;

    @IsOptional()
    cbs: string;

    @IsOptional()
    over: string;

    @IsOptional()
    value_over: string;

    @IsString()
    @IsNotEmpty()
    aliquota: string;

    @IsString()
    @IsNotEmpty()
    cofins: string;

    @IsString()
    @IsNotEmpty()
    pis: string;

    @IsString()
    @IsNotEmpty()
    icms: string;
    
}