import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PartnerCreditConfigService } from './partner-credit-config.service';
import { CreatePartnerCreditConfigDto } from './dto/partner-credit-config.dto';
import { UpdatePartnerCreditConfigDto } from './dto/update-partner-credit-config.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('partner-credit-config')
@UseGuards(AuthGuard)
export class PartnerCreditConfigController {

    constructor(private readonly partnerCreditConfigService: PartnerCreditConfigService) {}

    @Get(':partnerId')
    async getPartnerCreditConfig(@Param('partnerId') partnerId: string) {
        return this.partnerCreditConfigService.getPartnerCreditConfig(partnerId);
    }

    @Post(':partnerId')
    async createPartnerCreditConfig(@Param('partnerId') partnerId: string, @Body() createPartnerCreditConfigDto: CreatePartnerCreditConfigDto) {
        return this.partnerCreditConfigService.createPartnerCreditConfig(partnerId, createPartnerCreditConfigDto);
    }

    @Patch(':partnerId')
    async updatePartnerCreditConfig(@Param('partnerId') partnerId: string, @Body() updatePartnerCreditConfigDto: UpdatePartnerCreditConfigDto) {
        return this.partnerCreditConfigService.updatePartnerCreditConfig(partnerId, updatePartnerCreditConfigDto);
    }
}
