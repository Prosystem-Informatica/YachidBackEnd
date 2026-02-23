import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { TipoComissao } from 'src/core/enum/enums';
import { Address } from 'src/modules/address/entities/address.entity';
import { Representative } from './entities/representative.entity';
import { Repository } from 'typeorm';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { AddressService } from '../address/address.service';

@Injectable()
export class RepresentativeService {
  private readonly logger = new Logger(RepresentativeService.name);

  constructor(
    @InjectRepository(Representative, EDatabase.YACHID)
    private readonly representativeRepository: Repository<Representative>,
    private readonly addressService: AddressService,
  ) {}

  async findAll(): Promise<Representative[]> {
    try {
      return this.representativeRepository.find({
        relations: ['address'],
        order: { nome: 'ASC' },
      });
    } catch (error) {
      this.logger.error(
        `Error getting representatives: ${error.message}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<Representative> {
    try {
      const rep = await this.representativeRepository.findOne({
        where: { id },
        relations: ['address'],
      });
      if (!rep) {
        throw new BadRequestException('Representative not found');
      }
      return rep;
    } catch (error) {
      this.logger.error(`Error getting representative: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async create(createDto: CreateRepresentativeDto): Promise<Representative> {
    try {
      this.logger.log('Creating representative');

      let addressId: string | null = null;
      if (createDto.address) {
        const address = await this.addressService.create(createDto.address);
        addressId = address.id;
      }

      const { address: _, ...rest } = createDto;
      const rep = this.representativeRepository.create({
        ...rest,
        ...(addressId && { address: { id: addressId } as any }),
        comissao: rest.comissao ?? 0,
        status: rest.status ?? true,
        tipo_comissao: rest.tipo_comissao ?? TipoComissao.SEM_COMISSAO,
        pre_pedido: rest.pre_pedido ?? false,
        aplicativo: rest.aplicativo ?? false,
      });

      return this.representativeRepository.save(rep);
    } catch (error) {
      this.logger.error(`Error creating representative: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateDto: UpdateRepresentativeDto,
  ): Promise<Representative> {
    try {
      this.logger.log(`Updating representative ${id}`);

      await this.representativeRepository.findOneOrFail({ where: { id } });

      const updateData = { ...updateDto };
      await this.representativeRepository.update(id, updateData);

      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Error updating representative: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
