import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductComponentDto {
  @IsString()
  codigo: string;

  @IsString()
  componente: string;

  @IsOptional()
  @IsString()
  unidade?: string;

  @IsOptional()
  @IsNumber()
  prc_custo?: number;

  @IsOptional()
  @IsNumber()
  quantidade?: number;

  @IsOptional()
  @IsNumber()
  peso?: number;

  @IsOptional()
  @IsNumber()
  total?: number;
}
