import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email);
    
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.id;
    delete createdUser.password;
    
    return createdUser;
  } 

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>  {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
