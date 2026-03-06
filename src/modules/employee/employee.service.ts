import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { EDatabase } from 'src/config/db/database.config';
import * as crypto from 'crypto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UserService } from '../user/user.service';
import { ListEmployeesDto } from './dto/list-employees.dto';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee, EDatabase.YACHID)
    private readonly employeeRepository: Repository<Employee>,
    private readonly userService: UserService,
  ) {}

  private readonly Logger = new Logger(EmployeeService.name);

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: { user: true, branch: true },
    });
    if (!employee) {
      throw new BadRequestException('Funcionário não encontrado');
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.findOne(id);
    const { email, base64, ...employeeData } = updateEmployeeDto;

    if (Object.keys(employeeData).length > 0) {
      await this.employeeRepository.update(id, employeeData);
    }

    if (email !== undefined && employee.user) {
      await this.userService.updateEmail(employee.user.id, email);
    }

    return this.findOne(id);
  }

  async findOneByUserId(id: string) {
    return await this.employeeRepository.findOne({
      where: { user: { id: id } },
      relations: {
            branch: true,
      },
    });
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    branchId: string,
  ) {
    try {

      this.Logger.log(`Creating User for branch ${branchId}`);

      const tempPassword = crypto.randomBytes(12).toString('hex');
      const user = await this.userService.createUser(
        { email: createEmployeeDto.email, password: tempPassword },
        UserRole.EMPLOYEE,
      );

      if (!user) {
        throw new BadRequestException('Error creating user');
      }

      this.Logger.log(`User created successfully: ${user.id}`);  

      const employee = await this.employeeRepository.save({
        ...createEmployeeDto,
        branch: { id: branchId },
        user: { id: user.id },
      });

      if (!employee) {
        throw new BadRequestException('Error creating employee');
      }

      this.Logger.log(`Employee created successfully: ${employee.id}`);

      return employee;


    } catch (error) {
      this.Logger.error(`Error creating employee: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Error creating employee');
    }
  }


  async getAllEmployeesByEnterprise(enterpriseId: string): Promise<Employee[]> {
    try {
      this.Logger.log(`Getting all employees by enterprise ${enterpriseId}`);
      
      const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

      queryBuilder.leftJoin('employee.branch', 'branch');
      queryBuilder.leftJoin('branch.enterprise', 'enterprise');
      queryBuilder.where('enterprise.id = :enterpriseId', { enterpriseId });
      queryBuilder.select([
        'employee.id',
        'employee.name',
        'employee.document',
        'employee.role',
      ]);

      return await queryBuilder.getRawMany();


    } catch (error) {
      this.Logger.error(`Error getting all employees by enterprise: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Error getting all employees by enterprise');
    }
  }



  async getEmployees(listEmployeesDto: ListEmployeesDto): Promise<Employee[]> {
    try {
      this.Logger.log(`Getting employees`);

      const { branchId, enterpriseId, name, document, role, limit, offset } = listEmployeesDto;

      const queryBuilder = this.employeeRepository.createQueryBuilder('employee');

      if (branchId) {
        queryBuilder
          .leftJoin('employee.branch', 'branch')
          .addSelect('branch.id', 'branchId')
          .addSelect('branch.name', 'branchName');
        queryBuilder.andWhere('employee.branch_id = :branchId', { branchId });
      } else if (enterpriseId) {
        queryBuilder
          .leftJoin('employee.branch', 'branch')
          .leftJoin('branch.enterprise', 'enterprise')
          .addSelect('branch.id', 'branchId')
          .addSelect('branch.name', 'branchName');
        queryBuilder.andWhere('enterprise.id = :enterpriseId', { enterpriseId });
      }

      if(name) {
        queryBuilder.andWhere('employee.name LIKE :name', { name: `%${name}%` });
      }

      if(document) {
        queryBuilder.andWhere('employee.document = :document', { document });
      }

      if(role) {
        queryBuilder.andWhere('employee.role = :role', { role });
      }

      if (limit) {
        queryBuilder.limit(limit);
      }

      if (offset) {
        queryBuilder.offset(offset);
      }

      return await queryBuilder.getRawMany();
      
    }catch(error) {
      throw new BadRequestException(error.message);
    }
  }
}
