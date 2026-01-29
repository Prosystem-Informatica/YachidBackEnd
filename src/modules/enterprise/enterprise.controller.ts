import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';

@Controller('enterprise')
export class EnterpriseController {

    constructor(private readonly enterpriseService: EnterpriseService) {}

    @Post('/:entrepreneurId')
    @HttpCode(201)
    async createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto, @Param('entrepreneurId') entrepreneurId: string) {
        return this.enterpriseService.createEnterprise(createEnterpriseDto, entrepreneurId);
    }

    @Get('/:entrepreneurId')
    @HttpCode(200)
    async getEnterprisesByEntrepreneur(@Param('entrepreneurId') entrepreneurId: string): Promise<Enterprise[]> {
        return this.enterpriseService.getEnterprisesByEntrepreneur(entrepreneurId);
    }

}
