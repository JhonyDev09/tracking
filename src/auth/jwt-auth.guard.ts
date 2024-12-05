import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    this.logger.log('Validando acceso a una ruta protegida');
    return super.canActivate(context); // Llama al guard estándar de Passport
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.warn('Acceso denegado: token inválido o no proporcionado');
      throw err || new UnauthorizedException('No autorizado');
    }

    this.logger.log(`Acceso autorizado para usuario: ${user.nombreUsuario}`);
    return user;
  }
}
