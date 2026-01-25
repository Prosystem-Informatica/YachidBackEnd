import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcryptjs from 'bcryptjs';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee, EDatabase.YACHID)
        private readonly employeeRepository: Repository<Employee>,
        private readonly userService: UserService,
    ) {}

    async findOneByUserId(id: string) {
        return await this.employeeRepository.findOne({ where: { user: { id: id } } });
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto, createUserDto: CreateUserDto, enterpriseId: string) {

        try{

            const user = await this.userService.createUser(createUserDto);

            if(!user) {
                throw new BadRequestException('Error creating user');
            }

            const employee = await this.employeeRepository.create({
                ...createEmployeeDto,
                enterprise: { id: enterpriseId },
                user: { id: user.id },
            });

            return await this.employeeRepository.save(employee);

        }catch(error){
            console.error(error);
            throw new Error(error);
        }
    }


    async registerEmployee(createEmployeeDto: CreateEmployeeDto, userId: string) {
        try {
            const employee = this.employeeRepository.create({...createEmployeeDto, user: { id: userId }});
            return await this.employeeRepository.save(employee);
        }catch(error) {
            throw new BadRequestException(error.message ?? 'Error registering employee');
        }
    }
}

