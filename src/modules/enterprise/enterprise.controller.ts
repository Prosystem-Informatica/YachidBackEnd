import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('enterprise')
export class EnterpriseController {

    constructor(private readonly enterpriseService: EnterpriseService) {}

    @Post('/:entrepreneurId')
    @UseGuards(AuthGuard)
    @HttpCode(201)
    async createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto, @Param('entrepreneurId') entrepreneurId: string) {
        return this.enterpriseService.createEnterprise(createEnterpriseDto, entrepreneurId);
    }

    @Get('/:entrepreneurId')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getEnterprisesByEntrepreneur(@Param('entrepreneurId') entrepreneurId: string): Promise<Enterprise[]> {
        return this.enterpriseService.getEnterprisesByEntrepreneur(entrepreneurId);
    }

    @Get('/:enterpriseId/details')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async getEnterprises(@Param('enterpriseId') enterpriseId: string): Promise<Enterprise[]> {
        return this.enterpriseService.getEnterpriseDetail(enterpriseId);
    }

}
