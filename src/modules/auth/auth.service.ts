import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { Employee } from '../employee/entities/employee.entity';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const employee = await this.employeeService.findOneByEmail(email);

        if (!employee || !employee.password) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        if(!bcryptjs.compareSync(password, employee.password)) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const token = await this.generateEmployeeTokens(employee);

        return {
            token
        };
    }

    async generateEmployeeTokens(employee: Employee): Promise<{ accessToken: string }> {
        const authSign = {
          name: employee.name,
          email: employee.email,
          id: employee.id,
          sessionId: uuidV4(),
          levelAccess: employee.role,
        };
    
        const TWO_HOUR_IN_SECOUNDS = 60 * 60 * 24;
    
        const accessToken = this.jwtService.sign(authSign, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: TWO_HOUR_IN_SECOUNDS,
        });
    
        return {
          accessToken,
        };
      }
}
