import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User, UserRole } from './entities/user.entity';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User, EDatabase.YACHID)
        private readonly userRepository: Repository<User>,
    ) {}

    private readonly Logger = new Logger(UserService.name);


    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }


    async createUser(createUserDto: CreateUserDto, role: UserRole) {
        try {
            console.log(createUserDto);
            return await this.userRepository.save({...createUserDto, role});
        
        }catch(error) {
            this.Logger.error(`Error creating user: ${error.message}`);
            throw new BadRequestException(error.message ?? 'Error creating user');
        }
    }
}
