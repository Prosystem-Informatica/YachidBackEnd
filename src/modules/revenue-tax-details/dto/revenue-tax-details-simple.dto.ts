import { IsNotEmpty, IsString } from "class-validator";

export class RevenueTaxDetailsSimpleDto {
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

    @IsString()
    @IsNotEmpty()
    receita_bruta_anual: string;
}