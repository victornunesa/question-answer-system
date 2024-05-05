import { Controller, Post, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Request,} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login') 
    async login(@Body() loginDTO: LoginDTO): Promise<{access_token : string}> {
      return this.authService.login(loginDTO);
    }
}
