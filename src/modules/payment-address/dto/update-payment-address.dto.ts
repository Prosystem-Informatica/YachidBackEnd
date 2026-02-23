import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdatePaymentAddressDto {
    @IsOptional()
    @IsString()
    representative: string;

    @IsOptional()
    @IsString()
    cep: string;

    @IsOptional()
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    neighborhood: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    uf: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    observations: string;

    @IsBoolean()
    @IsOptional()
    credit_account: boolean;
}