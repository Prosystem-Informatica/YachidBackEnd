import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateStockAddressDto {
  @IsString()
  rua: string;

  @IsString()
  prateleiras: string;

  @IsNumber()
  @IsOptional()
  estoque_minimo?: number;

  @IsNumber()
  @IsOptional()
  estoque_maximo?: number;
}
