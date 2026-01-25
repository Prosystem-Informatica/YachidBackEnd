import { forwardRef, Module } from '@nestjs/common';
import { EntrepreneurController } from './entrepreneur.controller';
import { EntrepreneurService } from './entrepreneur.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrepreneur } from './entities/entrepreneur.entity';
import { EDatabase } from 'src/config/db/database.config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entrepreneur], EDatabase.YACHID), forwardRef(() => AuthModule), forwardRef(() => UserModule)],
  controllers: [EntrepreneurController],
  providers: [EntrepreneurService],
  exports: [EntrepreneurService],
})
export class EntrepreneurModule {}
