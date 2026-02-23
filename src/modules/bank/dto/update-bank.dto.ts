import { IsOptional, IsString } from 'class-validator';

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  numero_banco?: string;

  @IsOptional()
  @IsString()
  nome?: string;
}
