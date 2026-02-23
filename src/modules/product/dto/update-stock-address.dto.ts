import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateStockAddressDto {
  @IsOptional()
  @IsString()
  rua?: string;

  @IsOptional()
  @IsString()
  prateleiras?: string;

  @IsOptional()
  @IsNumber()
  estoque_minimo?: number;

  @IsOptional()
  @IsNumber()
  estoque_maximo?: number;
}
