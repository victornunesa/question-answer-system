import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JWTStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { authConstants } from './auth.constants';
import { LocalStrategy } from './local.strategy';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({ secret: authConstants.secret, signOptions: { expiresIn: '1d'}}),
  ],
  providers: [AuthService, UsersService, JWTStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
