import { Type } from "class-transformer";
import {  IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "src/modules/address/dto/address.dto";
import { BaseEntity } from "typeorm";


export class CreateBranchDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto;


}