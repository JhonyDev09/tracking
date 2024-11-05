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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tracking',
      entities: [Dispositivo, Dato],
      synchronize: true,
    }),
    UsuariosModule,
    UnidadesModule,
    DispositivosModule,
    DatosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
