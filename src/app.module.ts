import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadesModule } from './unidades/unidades.module';
import { DispositivosModule } from './dispositivos/dispositivos.module';
import { DatosModule } from './datos/datos.module';
import { Dispositivo } from './dispositivos/entities/dispositivo.entity';
import { Dato } from './datos/entities/dato.entity';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { UbicacionesGateway } from './ubicaciones/ubicaciones.gateway';
import { DispUnidadModule } from './disp-unidad/disp-unidad.module';
import { UsrUnidadModule } from './usr-unidad/usr-unidad.module';
import { DispUnidad } from './disp-unidad/entities/disp-unidad.entity';
import { Unidade } from './unidades/entities/unidade.entity';
import { UsrUnidad } from './usr-unidad/entities/usr-unidad.entity';
import { Empleado } from './empleado/entities/empleado.entity';
import { EmpleadoModule } from './empleado/empleado.module';
import { RolModule } from './rol/rol.module';
import { Rol } from './rol/entities/rol.entity';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { TiposModule } from './tipos/tipos.module';
import { ColorModule } from './color/color.module';
import { StatusModule } from './status/status.module';
import { Marca } from './marcas/entities/marca.entity';
import { Modelo } from './modelos/entities/modelo.entity';
import { Tipo } from './tipos/entities/tipo.entity';
import { Color } from './color/entities/color.entity';
import { Status } from './status/entities/status.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',//'database-1.ctwks8qa0png.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: '', //'olivarsoto09',
      database: 'tracking',
      entities: [Dispositivo, Dato, DispUnidad, Unidade, UsrUnidad, Empleado, Rol, Marca, Modelo, Tipo, Color, Status],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación sin necesidad de importarlo en cada módulo
      envFilePath: '.env', // Ruta al archivo .env (por defecto ya busca .env en el root)
    }),
    UnidadesModule,
    DispositivosModule,
    DatosModule,
    SocketModule,
    DispUnidadModule,
    UsrUnidadModule,
    EmpleadoModule,
    RolModule,
    MarcasModule,
    ModelosModule,
    TiposModule,
    ColorModule,
    StatusModule
  ],
  controllers: [AppController],
  providers: [AppService, UbicacionesGateway],
})
export class AppModule {}
