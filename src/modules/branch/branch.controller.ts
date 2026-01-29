import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/branch.dto';
import { Branch } from './entities/branch.entity';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/address.dto';

@Controller('branch')
export class BranchController {

    constructor(private readonly branchService: BranchService, private readonly addressService: AddressService) {
    }

    @Post('/:enterpriseId')
    @HttpCode(204)
    async createBranch(@Body() createBranchDto: CreateBranchDto,  @Param('enterpriseId') enterpriseId: string) : Promise<void> {
        try {
            const branch = await this.branchService.createBranch(createBranchDto, enterpriseId);
            if(!branch) {
                throw new BadRequestException('Branch not created');
            }

            if(!createBranchDto.address) {
                throw new BadRequestException('Address is required');
            }
            
            const address = await this.addressService.create(createBranchDto.address, branch.id);

            if(!address) {
                throw new BadRequestException('Address not created');
            }
            
       

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('/:enterpriseId')
    @HttpCode(200)
    async getBranchesByEnterprise(@Param('enterpriseId') enterpriseId: string): Promise<Branch[]> {
        return this.branchService.getBranchesByEnterprise(enterpriseId);
    }

   
}
