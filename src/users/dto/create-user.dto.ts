
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
