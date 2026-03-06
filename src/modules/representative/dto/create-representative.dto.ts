import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/address.dto';
import { TipoComissao } from 'src/core/enum/enums';

export class CreateRepresentativeDto {

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsNumber()
  comissao?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsOptional()
  @IsString()
  ie_rg?: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsOptional()
  @IsString()
  contato?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsEnum(TipoComissao)
  tipo_comissao?: TipoComissao;

  @IsOptional()
  @IsBoolean()
  pre_pedido?: boolean;

  @IsOptional()
  @IsBoolean()
  aplicativo?: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address?: CreateAddressDto;
}
