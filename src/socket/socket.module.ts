import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { DatosModule} from 'src/datos/datos.module';
import { UbicacionesGateway } from 'src/ubicaciones/ubicaciones.gateway';

@Module({
  providers: [SocketService, UbicacionesGateway],
  imports: [DatosModule],
  exports: [SocketService]
})
export class SocketModule {}
