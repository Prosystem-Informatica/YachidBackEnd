import { Body, Controller, Get, HttpCode, Param, Patch, UseGuards } from '@nestjs/common';
import { PaymentAddressService } from './payment-address.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { PaymentAddress } from './entities/payment-address.entity';
import { UpdatePaymentAddressDto } from './dto/update-payment-address.dto';

@Controller('payment-address')
export class PaymentAddressController {

    constructor(private readonly paymentAddressService: PaymentAddressService) {}


    @UseGuards(AuthGuard)
    @Get(':partnerId')
    async getPaymentAddress(@Param('partnerId') partnerId: string): Promise<PaymentAddress> {
        return await this.paymentAddressService.getMyPaymentAddress(partnerId);
    }

    @UseGuards(AuthGuard)
    @HttpCode(204)
    @Patch(':paymentAddressId')
    async updatePaymentAddress(@Param('paymentAddressId') id: string, @Body() updatePaymentAddressDto: UpdatePaymentAddressDto): Promise<void> {
        return await this.paymentAddressService.updatePaymentAddress(id, updatePaymentAddressDto);
    }
}
