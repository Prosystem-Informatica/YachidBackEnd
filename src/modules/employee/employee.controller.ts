import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) {}


    @Post('/:enterpriseId/create')
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto, @Param('enterpriseId') enterpriseId: string, @Param('addressId') addressId: string) {
        return this.employeeService.createEmployee(createEmployeeDto, enterpriseId, addressId);
    }


}
