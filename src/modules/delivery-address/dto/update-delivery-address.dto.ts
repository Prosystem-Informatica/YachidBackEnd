import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateDeliveryAddressDto {

    @IsOptional()
    @IsString()
    cep?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    region?: string;

    @IsOptional()
    @IsString()
    neighborhood?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    uf?: string;

    @IsOptional()
    @IsString()
    observations?: string;

    @IsOptional()
    @IsBoolean()
    bonification?: boolean;
}
