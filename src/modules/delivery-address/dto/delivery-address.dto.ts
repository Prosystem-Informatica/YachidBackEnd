import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateDeliveryAddressDto {

    @IsString() 
    cep: string;
    
    @IsString()
    street: string;

    @IsString()
    region: string;

    @IsString()
    neighborhood: string;

    @IsString()
    city: string;

    @IsString()
    uf: string;

    @IsString()
    @IsOptional()
    observations: string;

    @IsBoolean()
    bonification: boolean;
}