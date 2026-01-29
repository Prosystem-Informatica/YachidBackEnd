import {  IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { CreateAddressDto } from "src/modules/address/dto/address.dto";
import { BaseEntity } from "typeorm";


export class CreateBranchDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsObject()
    address?: CreateAddressDto;


}