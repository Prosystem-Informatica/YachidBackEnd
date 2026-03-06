import { BadRequestException, Body, Controller, Get, HttpCode, Logger, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../photos/photos.service';
import { Employee } from './entities/employee.entity';
import { ListEmployeesDto } from './dto/list-employees.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly photosService: PhotosService,
    ) {}

    @UseGuards(AuthGuard)
    @Get('employees')
    @HttpCode(200)
    async getEmployees(@Query() listEmployeesDto: ListEmployeesDto): Promise<Employee[]> {
        return this.employeeService.getEmployees(listEmployeesDto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @HttpCode(200)
    async getEmployee(@Param('id') id: string) {
        return this.employeeService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    @HttpCode(200)
    async updateEmployee(
        @Param('id') id: string,
        @Body() updateDto: UpdateEmployeeDto,
    ) {
        try {
            const employee = await this.employeeService.update(id, updateDto);
            if (updateDto.base64) {
                await this.photosService.createPhoto(updateDto.base64, id);
            }
            return employee;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Post('/:branchId/create')
    @HttpCode(204)
    async createEmployee( @Body() createEmployeeDto: CreateEmployeeDto, @Param('branchId') branchId: string) {
        try {

        const employee = await this.employeeService.createEmployee(createEmployeeDto, branchId);

        if(!employee) {
            throw new BadRequestException('Employee not created');
        }

        if(createEmployeeDto.base64) {

            await this.photosService.createPhoto(createEmployeeDto.base64, employee.id);
        }

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

}
