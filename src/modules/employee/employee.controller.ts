import { BadRequestException, Body, Controller, Get, HttpCode, Logger, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../photos/photos.service';
import { Employee } from './entities/employee.entity';
import { ListEmployeesDto } from './dto/list-employees.dto';

@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly photosService: PhotosService,
    ) {}

    private readonly Logger = new Logger(EmployeeController.name);

    @Post('/:branchId/create')
    @HttpCode(204)
    async createEmployee( @Body() createEmployeeDto: CreateEmployeeDto, @Body() createUserDto: CreateUserDto, @Param('branchId') branchId: string) {
        try {

        const employee = await this.employeeService.createEmployee(createEmployeeDto, createUserDto, branchId);

        if(!employee) {
            throw new BadRequestException('Employee not created');
        }

        await this.photosService.createPhoto(createEmployeeDto.base64, employee.id);

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/employees')
    @HttpCode(200)
    async getEmployees(@Query() listEmployeesDto: ListEmployeesDto): Promise<Employee[]> {
        return this.employeeService.getEmployees(listEmployeesDto);
    }

}
