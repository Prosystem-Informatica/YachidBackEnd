import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee, EDatabase.YACHID)
    private readonly employeeRepository: Repository<Employee>,
    ) {}


    async findOneByEmail(email: string) {
        return await this.employeeRepository.findOne({ where: { email } });
    }


    async createEmployee(createEmployeeDto: CreateEmployeeDto, enterpriseId: string, addressId: string) {

        try{

            const hashedPassword = await bcryptjs.hash(createEmployeeDto.password, 12);

            this.employeeRepository.create({
                ...createEmployeeDto,
                password: hashedPassword,
                // enterprise: { id: enterpriseId },
                address: { id: addressId },
            });

        }catch(error){
            console.error(error);
            throw new Error(error);
        }
    }
}

