import { IsNumber, IsOptional } from "class-validator";

export class BaseListDto {

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsNumber()
    @IsOptional()
    offset?: number;
}