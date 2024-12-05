import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Usa variables de entorno en producción
    });
  }

  async validate(payload: any) {
    this.logger.log(`Validando token para usuario: ${payload.nombreUsuario}`);
    return { id: payload.id, nombreUsuario: payload.nombreUsuario, rolId: payload.rolId };
  }
}
