import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxRegime } from './entities/tax-regime.entity';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { TaxRegimeDto } from './dto/tax-regime.dto';

@Injectable()
export class TaxRegimeService {

    constructor(
        @InjectRepository(TaxRegime, EDatabase.YACHID)
        private taxRegimeRepository: Repository<TaxRegime>,
    ) {}


    async setTaxRegime(taxRegimeDto: TaxRegimeDto, branchId: string) : Promise<TaxRegime> {
       try {

        const taxRegime =  this.taxRegimeRepository.create({
            ...taxRegimeDto,
            branch: { id: branchId }
        });

        if(!taxRegime) {
            throw new BadRequestException('Tax regime not created');
        }

        return await this.taxRegimeRepository.save(taxRegime);

       }catch(error) {
        throw new BadRequestException(error.message);
       }
    }
}
