import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";


export class CreatePartnerCreditConfigDto {
    
    @IsString()
    credit_value: string;

    @IsBoolean()
    serasa_check: boolean;

    @IsOptional()
    @IsDateString()
    date?: string;

    @IsBoolean()
    new_order: boolean;

    @IsBoolean()
    order_release: boolean;

    @IsBoolean()
    nfe_issuance: boolean;

    @IsBoolean()
    credit_analysis: boolean;

}