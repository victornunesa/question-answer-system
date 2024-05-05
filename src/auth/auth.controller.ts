import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
      return this.authService.validateUser(loginDTO);
    }

    @Post('register')
    async register(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.register(CreateUserDto);
    }
}
