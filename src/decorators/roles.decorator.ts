import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';


export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);