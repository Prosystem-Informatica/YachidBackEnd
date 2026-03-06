import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { LayoutRemessa } from 'src/core/enum/enums';

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  numero_banco?: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  agencia_numero?: string;

  @IsOptional()
  @IsString()
  agencia_dv?: string;

  @IsOptional()
  @IsString()
  conta_numero?: string;

  @IsOptional()
  @IsString()
  conta_dv?: string;

  @IsOptional()
  @IsString()
  codigo_cedente?: string;

  @IsOptional()
  @IsString()
  codigo_convenio?: string;

  @IsOptional()
  @IsString()
  codigo_empresa?: string;

  @IsOptional()
  @IsInt()
  ultimo_boleto_emitido?: number;

  @IsOptional()
  @IsString()
  codigo_transmissao?: string;

  @IsOptional()
  @IsNumber()
  mora_diaria_percent?: number;

  @IsOptional()
  @IsString()
  carteira?: string;

  @IsOptional()
  @IsString()
  variacao_carteira?: string;

  @IsOptional()
  @IsNumber()
  multa_percent?: number;

  @IsOptional()
  @IsInt()
  dias_protesto?: number;

  @IsOptional()
  @IsEnum(LayoutRemessa)
  layout_remessa?: LayoutRemessa;

  @IsOptional()
  @IsString()
  instrucoes_boleto?: string;
}
