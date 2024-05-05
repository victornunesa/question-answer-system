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

    async login(loginDTO: LoginDTO): Promise<{access_token : string}> {
      const user = await this.validateUser(loginDTO);
      return { access_token: this.jwtService.sign({ sub: user.id, email: user.email  }) };
    }


    async register(user: CreateUserDto): Promise<User> {
        const existingUser = await this.usersService.findOneByEmail(user.email);
        
        if (existingUser) {
          throw new BadRequestException('email already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };
        const createdUser = await this.usersService.create(newUser);
        delete createdUser.id;
        delete createdUser.password;
        
        return createdUser;
    }
  }
  
