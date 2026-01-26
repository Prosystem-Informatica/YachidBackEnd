import { IsEnum, IsNotEmpty, IsString } from "class-validator";
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

    @IsNotEmpty()
    @IsEnum({ message: 'Status inválido' })
    status: EmployeeStatus;

    @IsNotEmpty()
    @IsEnum({ message: 'Defina o cargo do funcionário' })
    role: EmployeeRole;

    @IsNotEmpty()
    @IsString()
    base64: string;
}
