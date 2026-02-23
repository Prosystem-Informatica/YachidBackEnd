import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAccountsReceivableDto {
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

  @IsString()
  receberto_aberto: string;

  @IsString()
  cheq_em_aberto: string;

  @IsString()
  cheq_a_vencer: string;

  @IsString()
  serasa: string;

  @IsString()
  average_orders: string;

  @IsString()
  processed_orders: string;
}
