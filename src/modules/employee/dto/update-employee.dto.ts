import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EmployeeRole } from '../entities/employee.entity';
import { EmployeeStatus } from './create-employee.dto';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsEnum(EmployeeStatus, { message: 'Status inválido' })
  status?: EmployeeStatus;

  @IsOptional()
  @IsEnum(EmployeeRole, { message: 'Cargo inválido' })
  role?: EmployeeRole;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  base64?: string;
}

