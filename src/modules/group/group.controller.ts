import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(204)
  async inviteEnterprise(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    await this.groupService.inviteEnterprise(id, updateGroupDto.enterpriseId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupService.remove(id);
  }
}
