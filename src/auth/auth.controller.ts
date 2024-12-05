import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para iniciar sesión
   */
  @Post('login')
  async login(@Body() loginDto: { nombreUsuario: string; contrasena: string }) {
    const { nombreUsuario, contrasena } = loginDto;

    try {
      this.logger.log(`Petición de login recibida para usuario: ${nombreUsuario}`);
      const result = await this.authService.login(nombreUsuario, contrasena);
      this.logger.log(`Login exitoso para usuario: ${nombreUsuario}`);
      return result;
    } catch (error) {
      this.logger.error(`Error durante el login para usuario: ${nombreUsuario}`, error.stack);
      throw error; // Lanza el error al cliente
    }
  }

  @Post('logout')
  logout() {
    this.logger.log('Cierre de sesión realizado exitosamente');
    return { message: 'Sesión cerrada' };
  }
}
