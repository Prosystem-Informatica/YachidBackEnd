import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EmployeeRole } from "../entities/employee.entity";

export enum EmployeeStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    document: string;

    @IsNotEmpty({ message: 'Defina o status do funcionário' })
    status: EmployeeStatus;

    @IsNotEmpty({ message: 'Defina o cargo do funcionário' })
    role: EmployeeRole;

    @IsOptional()
    @IsString()
    base64: string;
}
