import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/branch.dto';
import { Branch } from './entities/branch.entity';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/address.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('branch')
export class BranchController {

    constructor(private readonly branchService: BranchService, private readonly addressService: AddressService) {
    }

    @UseGuards(AuthGuard)
    @Post('/:enterpriseId')
    @HttpCode(204)
    async createBranch(@Body() createBranchDto: CreateBranchDto,  @Param('enterpriseId') enterpriseId: string) : Promise<void> {
        try {
            if(!createBranchDto.address) {
                throw new BadRequestException('Address is required');
            }

            const address = await this.addressService.create(createBranchDto.address);

            if(!address) {
                throw new BadRequestException('Address not created');
            }

            const branch = await this.branchService.createBranch(createBranchDto, enterpriseId, address.id);
            if(!branch) {
                throw new BadRequestException('Branch not created');
            }

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Get('/:enterpriseId')
    @HttpCode(200)
    async getBranchesByEnterprise(@Param('enterpriseId') enterpriseId: string): Promise<Branch[]> {
        return this.branchService.getBranchesByEnterprise(enterpriseId);
    }

   
}
