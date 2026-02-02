import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { EntrepreneurService } from './entrepreneur.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { CreateEntrepreneurDto } from './dto/createEntrepreneur.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('entrepreneur')
export class EntrepreneurController {

    constructor(private readonly entrepreneurService: EntrepreneurService) {}

    @UseGuards(AuthGuard)
    @Post('register')
    @HttpCode(201)
    register(@Body() user: CreateUserDto, @Body() entrepreneur: CreateEntrepreneurDto) {
        return this.entrepreneurService.createEntrepreneur(user, entrepreneur);
    }

}
