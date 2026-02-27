import { IsOptional, IsString } from "class-validator";
import { BaseListDto } from "src/config/db/base-list.dto";


export class ListPartnersDto extends BaseListDto {
    @IsString()
    @IsOptional()
    groupId?: string;
}