import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { EDatabase } from 'src/config/db/database.config';

@Module({
  imports: [TypeOrmModule.forFeature([Photo], EDatabase.YACHID)],
  providers: [PhotosService],
  exports: [PhotosService]
})
export class PhotosModule {}
