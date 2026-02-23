import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateAddressDto } from './dto/address.dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EDatabase } from 'src/config/db/database.config';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address, EDatabase.YACHID)
        private addressRepository: Repository<Address>,
    ) {}

    private readonly logger = new Logger(AddressService.name);


    async create(createAddressDto: CreateAddressDto): Promise<Address> {
        try{
            this.logger.log(`Creating address`);
     
            const address = await this.addressRepository.save(createAddressDto);

            if(!address) {
                throw new BadRequestException('Address not created');
            }

            this.logger.log(`Address created successfully`);

            return address;

        }catch(error) {
            throw new BadRequestException(error.message);
        }
    }
}
