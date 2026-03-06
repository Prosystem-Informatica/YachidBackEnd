import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { GroupEnterprise } from './entity/group-enterprise.entity';
import { GroupEnterpriseService } from './group-enterprise.service';
import { Group } from '../group/entities/group.entity';
import { Enterprise } from '../enterprise/entities/enterprise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [GroupEnterprise, Group, Enterprise],
      EDatabase.YACHID,
    ),
  ],
  providers: [GroupEnterpriseService],
  exports: [GroupEnterpriseService],
})
export class GroupEnterpriseModule {}
