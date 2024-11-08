import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UnidadesModule } from './unidades/unidades.module';
import { DispositivosModule } from './dispositivos/dispositivos.module';
import { DatosModule } from './datos/datos.module';
import { Dispositivo } from './dispositivos/entities/dispositivo.entity';
import { Dato } from './datos/entities/dato.entity';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.ctwks8qa0png.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'olivarsoto09',
      database: 'tracking',
      entities: [Dispositivo, Dato],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación sin necesidad de importarlo en cada módulo
      envFilePath: '.env', // Ruta al archivo .env (por defecto ya busca .env en el root)
    }),
    UsuariosModule,
    UnidadesModule,
    DispositivosModule,
    DatosModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
