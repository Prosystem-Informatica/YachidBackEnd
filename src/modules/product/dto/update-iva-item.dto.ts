import { IsNumber, IsString } from 'class-validator';

export class UpdateIvaItemDto {
  @IsString()
  estado: string;

  @IsNumber()
  valor: number;
}
