import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateRepresentativeDto } from './dto/create-representative.dto';
import { UpdateRepresentativeDto } from './dto/update-representative.dto';
import { Representative } from './entities/representative.entity';
import { RepresentativeService } from './representative.service';

@Controller('representatives')
export class RepresentativeController {
  constructor(
    private readonly representativeService: RepresentativeService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Representative[]> {
    return this.representativeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Representative> {
    return this.representativeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createDto: CreateRepresentativeDto,
  ): Promise<Representative> {
    return this.representativeService.create(createDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRepresentativeDto,
  ): Promise<Representative> {
    return this.representativeService.update(id, updateDto);
  }
}
