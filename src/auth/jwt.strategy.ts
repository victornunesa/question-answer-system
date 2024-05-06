import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authConstants } from './auth.constants';
import { ExtractJwt, Strategy } from "passport-jwt";
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: authConstants.secret, 
    });      
  }

  async validate(payload: any) {
    return {  email: payload.email, role: payload.role };
  }
}
