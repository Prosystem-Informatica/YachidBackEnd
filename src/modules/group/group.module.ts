import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { EDatabase } from 'src/config/db/database.config';
import { Enterprise } from '../enterprise/entities/enterprise.entity';
import { GroupEnterprise } from '../group-enterprise/entity/group-enterprise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Group, Enterprise, GroupEnterprise],
      EDatabase.YACHID,
    ),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
