import { IsNotEmpty, IsOptional  } from "class-validator";

export class CreateAddressDto{
    @IsNotEmpty()
    cep: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    number: string;

    @IsOptional()
    complement?: string;

    @IsNotEmpty()
    neighborhood: string;

    @IsNotEmpty()
    city: string;

    @IsOptional()
    city_ibge_code?: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    uf: string;

}

    