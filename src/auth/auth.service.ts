import { Injectable, UnauthorizedException, Logger, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../empleado/entities/empleado.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(nombreUsuario: string, contrasena: string): Promise<Empleado | null> {
    try {
      this.logger.log(`Validando usuario: ${nombreUsuario}`);
      const empleado = await this.empleadoRepository.findOne({ where: { nombreUsuario } });

      if (!empleado) {
        this.logger.warn(`Usuario no encontrado: ${nombreUsuario}`);
        return null;
      }

      this.logger.debug(`Hash almacenado en la base de datos: ${empleado.contrasena}`);
      this.logger.debug(`Contraseña ingresada: ${contrasena}`);

      const trimmedPassword = contrasena.trim();
      const isPasswordValid = await bcrypt.compare(trimmedPassword, empleado.contrasena);
      this.logger.debug(`Resultado de comparación de contraseñas: ${isPasswordValid}`);
      
      if (!isPasswordValid) {
        this.logger.warn(`Contraseña inválida para usuario: ${nombreUsuario}`);
        return null;
      }

      this.logger.log(`Usuario validado correctamente: ${nombreUsuario}`);
      return empleado;
    } catch (error) {
      this.logger.error(`Error validando al usuario ${nombreUsuario}`, error.stack);
      throw new InternalServerErrorException('Error validando al usuario.');
    }
  }

  async login(nombreUsuario: string, contrasena: string): Promise<{ accessToken: string }> {
    try {
      this.logger.log(`Intentando iniciar sesión para el usuario: ${nombreUsuario}`);
      const empleado = await this.validateUser(nombreUsuario, contrasena);

      if (!empleado) {
        this.logger.warn(`Intento de login fallido para usuario: ${nombreUsuario}`);
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload = { id: empleado.id, nombreUsuario: empleado.nombreUsuario, rolId: empleado.rolId };
      const accessToken = this.jwtService.sign(payload);

      this.logger.log(`Login exitoso para el usuario: ${nombreUsuario}`);
      return { accessToken };
    } catch (error) {
      this.logger.error(`Error durante el login para el usuario: ${nombreUsuario}`, error.stack);
      throw error;
    }
  }
}
