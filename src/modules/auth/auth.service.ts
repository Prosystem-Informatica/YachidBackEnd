import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Employee } from '../employee/entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/entities/user.entity';
import { Entrepreneur } from '../entrepreneur/entities/entrepreneur.entity';
import { Logger } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { EntrepreneurService } from '../entrepreneur/entrepreneur.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly employeeService: EmployeeService,
        private readonly entrepreneurService: EntrepreneurService,
    ) {}

    private readonly Logger = new Logger(AuthService.name);


    async findOneByUser(email: string) {
        return await this.userService.findOneByEmail(email);
    }

    async login(loginDto: LoginDto) {
        try {
                this.Logger.log(`Logging in user ${loginDto.email}`)
        const { email, password } = loginDto;

        const user = await this.userService.findOneByEmail(email);

        if (!user || !user.password) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        //TODO: Implementar a comparação de senha com o bcrypt
        // if(!bcryptjs.compareSync(password, user.password)) {
        //     throw new UnauthorizedException('Email ou senha inválidos');
        // }

        let userEntity: Entrepreneur | Employee | null = null;

        if(user.role === UserRole.EMPLOYEE) {
          userEntity = await this.employeeService.findOneByUserId(user.id);
        }

        if(user.role === UserRole.ENTREPRENEUR) {
          userEntity = await this.entrepreneurService.findOneByUser(user.id);
        }

        if(!userEntity) {
          throw new UnauthorizedException('Email ou senha inválidos');
        }

        const token = await this.generateUserToken(user, userEntity);

        return {
            token,
            user: {
              email: user.email,
              role: user.role,
              ...userEntity,
            }
        };
        } catch (error) {
          this.Logger.error(`Error logging in: ${error.message}`);
          throw new BadRequestException(error.message);
        }
    }

    async generateUserToken(user: User, userEntity: Entrepreneur | Employee): Promise<string> {
        const authSign = {
          name: userEntity.name,
          email: user.email,
          id: userEntity.id,
          sessionId: uuidV4(),
          levelAccess: user.role,
        };
    
        const TWO_HOUR_IN_SECOUNDS = 60 * 60 * 24;
    
        const accessToken = this.jwtService.sign(authSign, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: TWO_HOUR_IN_SECOUNDS,
        });
    
        return accessToken
        
      }

}
