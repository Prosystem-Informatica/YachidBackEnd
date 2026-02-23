import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAccountsPayableDto {
  @IsString()
  saldo_devedor: string;

  @IsString()
  maior_atraso: string;

  @IsOptional()
  @IsDateString()
  maior_fat?: string;

  @IsString()
  valor_maior_atraso: string;

  @IsOptional()
  @IsDateString()
  primeira_compra?: string;

  @IsString()
  valor_primeira_compra: string;

  @IsOptional()
  @IsDateString()
  ultima_compra?: string;

  @IsString()
  valor_ultima_compra: string;

  @IsString()
  atrasadas: string;

  @IsString()
  cartorio: string;

  @IsString()
  protesto: string;

  @IsString()
  normal: string;

  @IsString()
  observation: string;
}
