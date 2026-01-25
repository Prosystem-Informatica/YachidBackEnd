import { IsNotEmpty, IsString } from "class-validator";
import { EmployeeStatus } from "src/modules/employee/dto/create-employee.dto";


export class CreateEntrepreneurDto {
    @IsString()
    @IsNotEmpty({ message: 'Defina o nome do empreendedor' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Defina o documento do empreendedor' })
    document: string;

    @IsString()
    @IsNotEmpty({ message: 'Defina o telefone do empreendedor' })
    phone: string;

    @IsString()
    @IsNotEmpty({ message: 'Defina o status do empreendedor' })
    status: EmployeeStatus;

}