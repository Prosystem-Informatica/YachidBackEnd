import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum EnterpriseRegime {
    SIMPLE  = 'SIMPLES_NACIONAL',
    SIMPLE_OVER_REVENUE = 'SIMPLES_EXCESSO_RECEITA',
    NORMAL = 'NORMAL',
  }

export class TaxRegimeDto {
    @IsEnum(EnterpriseRegime, { message: 'Defina o regime tributário da empresa (SIMPLES_NACIONAL, SIMPLES_EXCESSO_RECEITA ou NORMAL)' })
    @IsNotEmpty()
    tax_regime: EnterpriseRegime;

    @IsString()
    @IsNotEmpty()
    regime_tributario_issqn: string;

    @IsString()
    @IsNotEmpty()
    ind_rat_issqn: string;

}