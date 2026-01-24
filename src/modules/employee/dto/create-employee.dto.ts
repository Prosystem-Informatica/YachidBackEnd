import {  IsNotEmpty, IsString } from "class-validator";

export type EmployeeStatus = 'ACTIVE' | 'INACTIVE';

export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    document: string;

    @IsNotEmpty()
    @IsString()
    status: EmployeeStatus;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsString()
    enterprise_id: string;

    @IsNotEmpty()
    @IsString()
    address_id: string;
}
