import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Nome do usuário
   * @example Carlos
   */
  @IsString()
  name?: string;

  /**
   * Email do usuario
   * @example carlos@mailinator.com
   */
  @IsEmail()
  email?: string;

  /**
   * Senha do futuro usuario
   * @example 123456
   */
  @IsString()
  password?: string;

  /**
   * Cargo do usuario
   * @example 'ORGANIZADOR'
   */
  @IsEnum(Role)
  role?: Role;
}
