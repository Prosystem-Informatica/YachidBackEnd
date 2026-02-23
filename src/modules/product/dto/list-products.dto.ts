import { IsOptional, IsString } from 'class-validator';
import { BaseListDto } from 'src/config/db/base-list.dto';

export class ListProductsDto extends BaseListDto {
  @IsOptional()
  @IsString()
  search?: string;
}
