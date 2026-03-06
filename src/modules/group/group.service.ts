import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { EDatabase } from 'src/config/db/database.config';
import { CreateGroupDto } from './dto/create-group.dto';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { GroupEnterprise } from '../group-enterprise/entity/group-enterprise.entity';

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);

  constructor(
    @InjectRepository(Group, EDatabase.YACHID)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Enterprise, EDatabase.YACHID)
    private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(GroupEnterprise, EDatabase.YACHID)
    private readonly groupEnterpriseRepository: Repository<GroupEnterprise>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      const group = this.groupRepository.create(createGroupDto);
      return await this.groupRepository.save(group);
    } catch (error) {
      this.logger.error(`Error creating group: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Erro ao criar grupo');
    }
  }

  async findAll(): Promise<Group[]> {
    try {
      return await this.groupRepository.find({
        relations: ['groupEnterprises', 'groupEnterprises.enterprise'],
      });
    } catch (error) {
      this.logger.error(`Error listing groups: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Erro ao listar grupos');
    }
  }

  async findOne(id: string): Promise<Group> {
    try {
      return await this.groupRepository.findOneOrFail({
        where: { id },
        relations: ['groupEnterprises', 'groupEnterprises.enterprise'],
      });
    } catch (error) {
      this.logger.error(`Error getting group: ${error.message}`);
      throw new BadRequestException('Grupo não encontrado');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.groupRepository.delete(id);
    } catch (error) {
      this.logger.error(`Error removing group: ${error.message}`);
      throw new BadRequestException(error.message ?? 'Erro ao remover grupo');
    }
  }

  async inviteEnterprise(groupId: string, enterpriseId: string): Promise<void> {
    try {
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
      });
      if (!group) {
        throw new BadRequestException('Grupo não encontrado');
      }

      const enterprise = await this.enterpriseRepository.findOne({
        where: { id: enterpriseId },
      });
      if (!enterprise) {
        throw new BadRequestException('Empresa não encontrada');
      }

      const existing = await this.groupEnterpriseRepository.findOne({
        where: { group: { id: groupId }, enterprise: { id: enterpriseId } },
      });

      if (!existing) {
        await this.groupEnterpriseRepository.save({
          group: { id: group.id },
          enterprise: { id: enterprise.id },
        });
      }


    } catch (error) {
      this.logger.error(`Error inviting enterprise to group: ${error.message}`);
      throw new BadRequestException(
        error.message ?? 'Erro ao convidar empresa para o grupo',
      );
    }
  }
}
