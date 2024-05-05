import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
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

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>  {
    return this.usersRepository.update(id, updateUserDto)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
