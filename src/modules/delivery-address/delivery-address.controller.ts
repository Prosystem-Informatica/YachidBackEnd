import { Body, Controller, Get, HttpCode, Param, Patch, Post,  UseGuards } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateDeliveryAddressDto } from './dto/delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';

@Controller('delivery-address')
export class DeliveryAddressController {

    constructor(private readonly deliveryAddressService: DeliveryAddressService) {}

    @UseGuards(AuthGuard)
    @Get(':partnerId')
    async getDeliveryAddressByPartnerId(@Param('partnerId') partnerId: string) {
        return this.deliveryAddressService.getDeliveryAddressByPartnerId(partnerId);
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Post(':partnerId/create')
    async createDeliveryAddress(@Param('partnerId') partnerId: string, @Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
        return this.deliveryAddressService.createDeliveryAddress(partnerId, createDeliveryAddressDto);
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Patch(':deliveryAddressId/update')
    async updateDeliveryAddress(@Param('deliveryAddressId') deliveryAddressId: string, @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto) {
        return this.deliveryAddressService.updateDeliveryAddress(deliveryAddressId, updateDeliveryAddressDto);
    }
}
