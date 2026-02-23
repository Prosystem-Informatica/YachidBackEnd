import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { TipoCusto } from 'src/core/enum/enums';
import { CreateProductStockDto } from './create-product-stock.dto';

export class CreateProductDto {
  @IsString()
  codigo: string;

  @IsOptional()
  @IsString()
  ultimo_codigo?: string;

  @IsOptional()
  @IsString()
  penultimo_codigo?: string;

  @IsOptional()
  @IsString()
  linha?: string;

  @IsOptional()
  @IsString()
  cod_barras?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsString()
  produto: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  familia?: string;

  @IsOptional()
  @IsString()
  unidade?: string;

  @IsOptional()
  @IsString()
  fabricante?: string;

  @IsOptional()
  @IsString()
  gramatura?: string;

  @IsOptional()
  @IsBoolean()
  calcula_icms?: boolean;

  @IsOptional()
  @IsString()
  cod_tributario?: string;

  @IsOptional()
  @IsNumber()
  peso_bruto?: number;

  @IsOptional()
  @IsNumber()
  peso_liquido?: number;

  @IsOptional()
  @IsNumber()
  peso_produto?: number;

  @IsOptional()
  @IsString()
  embalagem?: string;

  @IsOptional()
  @IsString()
  classificacao?: string;

  @IsOptional()
  @IsNumber()
  validade?: number;

  @IsOptional()
  @IsBoolean()
  produto_avulso?: boolean;

  @IsOptional()
  @IsEnum(TipoCusto)
  tipo_custo?: TipoCusto;

  @IsOptional()
  @IsNumber()
  custo_calculado?: number;

  @IsOptional()
  @IsNumber()
  custo_digitado?: number;

  @IsOptional()
  @IsNumber()
  custo_medio?: number;

  @IsOptional()
  @IsNumber()
  ultimo_custo?: number;

  @IsOptional()
  @IsNumber()
  penultimo_custo?: number;

  @IsOptional()
  @IsNumber()
  ant_pen_custo?: number;

  @IsOptional()
  @IsNumber()
  preco_min_7?: number;

  @IsOptional()
  @IsNumber()
  preco_min_12?: number;

  @IsOptional()
  @IsNumber()
  preco_min_18?: number;

  @IsOptional()
  @IsNumber()
  preco_tabela?: number;

  @IsOptional()
  @IsNumber()
  preco_anterior?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProductStockDto)
  stock?: CreateProductStockDto;
}
