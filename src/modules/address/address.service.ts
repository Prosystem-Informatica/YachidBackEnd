import { Injectable } from '@nestjs/common';
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


    async create(createAddressDto: CreateAddressDto): Promise<Address> {
        const address = this.addressRepository.create(createAddressDto);
        return this.addressRepository.save(address);
    }
}
