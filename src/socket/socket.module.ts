import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { DatosModule} from 'src/datos/datos.module';

@Module({
  providers: [SocketService],
  imports: [DatosModule, ],
})
export class SocketModule {}
