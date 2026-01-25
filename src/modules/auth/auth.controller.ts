import { Body, Controller, Post, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateEntrepreneurDto } from '../entrepreneur/dto/createEntrepreneur.dto';
import { CreateUserDto } from '../user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    
}
