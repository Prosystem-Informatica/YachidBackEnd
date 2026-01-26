import { BadRequestException, Injectable } from '@nestjs/common';
import { Entrepreneur } from './entities/entrepreneur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { CreateEntrepreneurDto } from './dto/createEntrepreneur.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class EntrepreneurService {
  constructor(
    @InjectRepository(Entrepreneur, EDatabase.YACHID)
    private readonly entrepreneurRepository: Repository<Entrepreneur>,
    private readonly userService: UserService,
  ) {}

  async findOneByUser(id: string) {
    return await this.entrepreneurRepository.findOne({
      where: { user: { id: id } },
      relations: {
        enterprises: true,
      },
    });
  }

  async createEntrepreneur(
    createUserDto: CreateUserDto,
    createEntrepreneurDto: CreateEntrepreneurDto,
  ) {
    try {
      const user = await this.userService.createUser({
        ...createUserDto,
        role: UserRole.ENTREPRENEUR,
      });

      if (!user) {
        throw new BadRequestException('Error creating user');
      }

      const entrepreneur = this.entrepreneurRepository.create({
        ...createEntrepreneurDto,
        user: { id: user.id },
      });

      if (!entrepreneur) {
        throw new BadRequestException('Error creating entrepreneur');
      }

      return await this.entrepreneurRepository.save(entrepreneur);
    } catch (error) {
      throw new BadRequestException(
        error.message ?? 'Error creating entrepreneur',
      );
    }
  }
}
