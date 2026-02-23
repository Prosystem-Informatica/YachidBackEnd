import { IsString, IsNotEmpty } from 'class-validator';
export class AddCarrierDto {

    @IsString()
    @IsNotEmpty()
    carrierId: string;

    @IsString()
    @IsNotEmpty()
    partnerId: string;
}