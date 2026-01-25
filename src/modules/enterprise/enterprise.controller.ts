import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/enterprise.dto';

@Controller('enterprise')
export class EnterpriseController {

    constructor(private readonly enterpriseService: EnterpriseService) {
        
    }

    @Post('/:entrepreneurId')
    async createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto, @Param('entrepreneurId') entrepreneurId: string) {
        return this.enterpriseService.createEnterprise(createEnterpriseDto, entrepreneurId);
    }


    @Get('/:entrepreneurId')
    async getEnterprisesByEntrepreneur(@Param('entrepreneurId') entrepreneurId: string) {
        return this.enterpriseService.getEnterprisesByEntrepreneur(entrepreneurId);
    }

}
