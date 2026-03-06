import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoComissao } from 'src/core/enum/enums';

export class UpdateRepresentativeDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsNumber()
  comissao?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsString()
  ie_rg?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  contato?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(TipoComissao)
  tipo_comissao?: TipoComissao;

  @IsOptional()
  @IsBoolean()
  pre_pedido?: boolean;

  @IsOptional()
  @IsBoolean()
  aplicativo?: boolean;
}
