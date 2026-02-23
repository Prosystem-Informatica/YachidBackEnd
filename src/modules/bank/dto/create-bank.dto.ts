import { IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  codigo: string;

  @IsString()
  numero_banco: string;

  @IsString()
  nome: string;
}
