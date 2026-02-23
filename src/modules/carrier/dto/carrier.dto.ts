import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarrierDto {
 @IsString()
 @IsNotEmpty()
 name: string;
}