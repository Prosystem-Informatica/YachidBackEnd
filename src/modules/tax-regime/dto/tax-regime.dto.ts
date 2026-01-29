import { IsEnum, IsString } from "class-validator";

export enum EnterpriseRegime {
    SIMPLE  = 'SIMPLES_NACIONAL',
    SIMPLE_OVER_REVENUE = 'SIMPLES_EXCESSO_RECEITA',
    NORMAL = 'NORMAL',
  }

export class TaxRegimeDto {

    @IsEnum({ message: 'Defina o regime tributário da empresa' })
    tax_regime: EnterpriseRegime;

    @IsString()
    regime_tributario_issqn: string;

    @IsString()
    ind_rat_issqn: string;

}