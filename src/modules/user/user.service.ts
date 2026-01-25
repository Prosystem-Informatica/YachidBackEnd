import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
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


    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }


    async createUser(createUserDto: CreateUserDto) {
        try {

        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
        
        }catch(error) {
            throw new BadRequestException(error.message ?? 'Error creating user');
        }
    }
}
