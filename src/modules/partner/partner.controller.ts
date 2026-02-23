import { Body, Controller, Get, Headers, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerDto } from './dto/partner.dto';
import { PartnerType } from 'src/core/enum/enums';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ListPartnersDto } from './dto/list-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Controller('partners')
export class PartnerController {
    constructor(private readonly partnerService: PartnerService) {
        
    }
    @UseGuards(AuthGuard)
    @Post(':partnerType/create')
    async createPartner(@Param('partnerType') partnerType: PartnerType, @Body() partnerDto: PartnerDto) {
        return this.partnerService.createPartner(partnerType, partnerDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    async getPartnersByEnterprise(@Query() listPartnersDto: ListPartnersDto) {
        return this.partnerService.getPartners(listPartnersDto);
    }


    @UseGuards(AuthGuard)
    @Get(':partnerId')
    async getPartnerDetails(@Param('partnerId') partnerId: string) {
        return this.partnerService.getPartnerDetails(partnerId);
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Patch(':partnerId')
    async updatePartner(@Param('partnerId') partnerId: string, @Body() updatePartnerDto: UpdatePartnerDto): Promise<void> {
        return this.partnerService.updatePartner(partnerId, updatePartnerDto);
    }
}

