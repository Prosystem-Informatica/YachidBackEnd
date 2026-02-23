import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { UpdateStockAddressDto } from './update-stock-address.dto';

export class UpdateProductStockDto {
  @IsOptional()
  @IsNumber()
  saldo_disponivel?: number;

  @IsOptional()
  @IsNumber()
  empenho?: number;

  @IsOptional()
  @IsDateString()
  data_ult_venda?: string;

  @IsOptional()
  @IsNumber()
  valor_ult_venda?: number;

  @IsOptional()
  @IsNumber()
  saldo_empresa?: number;

  @IsOptional()
  @IsNumber()
  empenho_empresa?: number;

  @IsOptional()
  @IsNumber()
  prod_programada?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateStockAddressDto)
  address?: UpdateStockAddressDto;
}
