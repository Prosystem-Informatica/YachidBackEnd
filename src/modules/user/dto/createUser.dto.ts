import { IsEmail,  IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}