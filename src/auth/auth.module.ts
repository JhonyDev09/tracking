import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Empleado } from '../empleado/entities/empleado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empleado]), // Entidad Empleado
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Usa variables de entorno para la clave secreta
      signOptions: { expiresIn: '1h' }, // Configuración del token JWT
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Exporta AuthService si se necesita en otros módulos
})
export class AuthModule {}
