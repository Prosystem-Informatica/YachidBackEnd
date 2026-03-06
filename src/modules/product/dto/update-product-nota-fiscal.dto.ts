import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { UpdateIvaItemDto } from './update-iva-item.dto';

export class UpdateProductNotaFiscalDto {
  @IsOptional()
  @IsString()
  iva_estado?: string;

  @IsOptional()
  @IsNumber()
  iva_valor?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateIvaItemDto)
  iva_tabela?: UpdateIvaItemDto[];

  @IsOptional()
  @IsString()
  ncm?: string;

  @IsOptional()
  @IsString()
  cest?: string;

  @IsOptional()
  @IsNumber()
  reducao_perc?: number;

  @IsOptional()
  @IsString()
  origem_icms?: string;

  @IsOptional()
  @IsString()
  sit_tributaria_icms?: string;

  @IsOptional()
  @IsString()
  cst_ibs?: string;

  @IsOptional()
  @IsString()
  classificacao_tributaria_ibs?: string;

  @IsOptional()
  @IsString()
  cst_cbs?: string;

  @IsOptional()
  @IsString()
  classificacao_tributaria_cbs?: string;

  @IsOptional()
  @IsString()
  classe_enquadramento_ipi?: string;

  @IsOptional()
  @IsString()
  codigo_enquadramento_ipi?: string;

  @IsOptional()
  @IsNumber()
  aliquota_ipi?: number;

  @IsOptional()
  @IsString()
  sit_tributaria_ipi?: string;

  @IsOptional()
  @IsString()
  sit_tributaria_pis?: string;

  @IsOptional()
  @IsNumber()
  aliquota_pis?: number;

  @IsOptional()
  @IsString()
  sit_tributaria_cofins?: string;

  @IsOptional()
  @IsNumber()
  aliquota_cofins?: number;
}
