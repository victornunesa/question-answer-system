//auth.service.ts
import {
    Injectable,
    NotAcceptableException,
    UnauthorizedException,
    BadRequestException
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { User } from 'src/users/entities/user.entity';
  import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private jwtService: JwtService,
    ) {}

    async validateUser(loginDTO: LoginDTO): Promise<User> {
        const user: User = await this.usersService.findOneByEmail(loginDTO.email);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const isMatch: boolean = bcrypt.compareSync(loginDTO.password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match');
        }
        return user;
    }

    async login(user: User): Promise<{access_token : string}> {
        const payload = { email: user.email, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(user: CreateUserDto): Promise<{access_token : string}> {
        const existingUser = await this.usersService.findOneByEmail(user.email);
        
        if (existingUser) {
          throw new BadRequestException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };
        const createdUser = await this.usersService.create(newUser);
        return this.login(createdUser);
    }
  }
  
