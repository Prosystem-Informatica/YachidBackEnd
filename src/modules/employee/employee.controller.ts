import { BadRequestException, Body, Controller, HttpCode, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../photos/photos.service';

@Controller('employee')
export class EmployeeController {

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly photosService: PhotosService,
    ) {}

    @Post('/:enterpriseId/create')
    @HttpCode(204)
    async createEmployee( @Body() createEmployeeDto: CreateEmployeeDto, @Body() createUserDto: CreateUserDto, @Param('enterpriseId') enterpriseId: string) {
        try {

        const employee = await this.employeeService.createEmployee(createEmployeeDto, createUserDto, enterpriseId);

        if(!employee) {
            throw new BadRequestException('Employee not created');
        }

        await this.photosService.createPhoto(createEmployeeDto.base64, employee.id);


        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

}
