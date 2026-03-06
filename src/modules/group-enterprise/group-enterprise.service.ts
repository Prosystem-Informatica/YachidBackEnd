import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { GroupEnterprise } from './entity/group-enterprise.entity';
import { Group } from '../group/entities/group.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { CreateGroupEnterpriseDto } from './dto/create-group-enterprise.dto';

@Injectable()
export class GroupEnterpriseService {
  private readonly logger = new Logger(GroupEnterpriseService.name);

  constructor(
    @InjectRepository(GroupEnterprise, EDatabase.YACHID)
    private readonly groupEnterpriseRepository: Repository<GroupEnterprise>,
    @InjectRepository(Group, EDatabase.YACHID)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Enterprise, EDatabase.YACHID)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  async linkEnterpriseToGroup(
    createDto: CreateGroupEnterpriseDto,
  ): Promise<GroupEnterprise> {
    try {
      const group = await this.groupRepository.findOne({
        where: { id: createDto.groupId },
      });
      if (!group) {
        throw new BadRequestException('Grupo não encontrado');
      }

      const enterprise = await this.enterpriseRepository.findOne({
        where: { id: createDto.enterpriseId },
      });
      if (!enterprise) {
        throw new BadRequestException('Empresa não encontrada');
      }

      const existing = await this.groupEnterpriseRepository.findOne({
        where: {
          group: { id: createDto.groupId },
          enterprise: { id: createDto.enterpriseId },
        },
        relations: ['group', 'enterprise'],
      });
      if (existing) {
        return existing;
      }

      const relation = this.groupEnterpriseRepository.create({
        group: { id: createDto.groupId },
        enterprise: { id: createDto.enterpriseId },
      });
      return await this.groupEnterpriseRepository.save(relation);
    } catch (error) {
      this.logger.error(`Error linking group-enterprise: ${error.message}`);
      throw new BadRequestException(
        error.message ?? 'Erro ao vincular empresa ao grupo',
      );
    }
  }

  async listByGroup(groupId: string): Promise<GroupEnterprise[]> {
    return this.groupEnterpriseRepository.find({
      where: { group: { id: groupId } },
      relations: ['group', 'enterprise'],
    });
  }
}
