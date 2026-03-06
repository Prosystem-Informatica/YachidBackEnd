import { IsOptional, IsString } from "class-validator";
import { BaseListDto } from "src/config/db/base-list.dto";

export class ListEmployeesDto extends BaseListDto {
    @IsString()
    @IsOptional()
    branchId?: string;

    @IsString()
    @IsOptional()
    enterpriseId?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    document?: string;

    @IsString()
    @IsOptional()
    role?: string;
}