import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}

    @Post('/:enterpriseId/create')
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Body() createUserDto: CreateUserDto, @Param('enterpriseId') enterpriseId: string) {
        return this.employeeService.createEmployee(createEmployeeDto, createUserDto, enterpriseId);
    }

}
