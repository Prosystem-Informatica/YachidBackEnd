import { Injectable } from '@nestjs/common';
import { RevenueTaxDetails } from './entities/revenue-tax-details.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';

@Injectable()
export class RevenueTaxDetailsService {

    constructor(
        @InjectRepository(RevenueTaxDetails, EDatabase.YACHID)
        private revenueTaxDetailsRepository: Repository<RevenueTaxDetails>,
    ) {}
}
