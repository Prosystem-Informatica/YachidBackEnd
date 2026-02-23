import { IsBoolean, IsOptional, IsString,   } from "class-validator";


export class CreatePaymentAddressDto {
    @IsOptional()
    representative: string;

    @IsString()
    cep: string;

    @IsString()
    number: string;

    @IsString()
    street: string;

    @IsString()
    neighborhood: string;

    @IsString()
    city: string;

    @IsString()
    uf: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    observations: string;

    @IsBoolean()
    credit_account: boolean;
}