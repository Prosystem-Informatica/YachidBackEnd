import { Body, Controller, Post } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/enterprise.dto';

@Controller('enterprise')
export class EnterpriseController {

    constructor(private readonly enterpriseService: EnterpriseService) {
        
    }

    @Post()
    async createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto) {
        return this.enterpriseService.createEnterprise(createEnterpriseDto);
    }

}
