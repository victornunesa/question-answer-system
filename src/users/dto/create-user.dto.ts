
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { Exclude } from 'class-transformer';
export class CreateUserDto {

  /**
   * Nome do usuário
   * @example Carlos
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Email do usuario
   * @example carlos@mailinator.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Senha do futuro usuario
   * @example 123456
   */
  @IsNotEmpty()
  @IsString()
  password: string;

  /**
   * Cargo do usuario
   * @example 'ORGANIZADOR'
   */
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
