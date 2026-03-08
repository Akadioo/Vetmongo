import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'miclaveultrasecreta123456',
    });
  }

  async validate(payload: any) {
    console.log('Payload recibido en JWT Strategy:', payload);

    if (!payload?.sub) {
      console.error('El token no contiene sub (ID del usuario)');
      return null;
    }

    return {
      userId: payload.sub,
      sub: payload.sub,
      email: payload.email,
      nombre: payload.nombre,
      role: payload.role,
    };
  }
}
