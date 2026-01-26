import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EDatabase } from 'src/config/db/database.config';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {

    constructor(
        @InjectRepository(Photo, EDatabase.YACHID)
        private photoRepository: Repository<Photo>,
    ) {}


    async createPhoto(file: string, employeeId: string) {
        try {

            const photo = this.photoRepository.create({
                base64: file,
                employee: { id: employeeId },
            });

            return await this.photoRepository.save(photo);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
