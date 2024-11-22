import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { DatosService } from "src/datos/datos.service";

@WebSocketGateway(3003, {namespace: 'data', cors:{origin:'*'}})

export class UbicacionesGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server: Server;

    constructor(private readonly datosService: DatosService){}

    handleConnection(client: Socket) {
        console.log('Cliente conectado:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Cliente desconectado:', client.id);
    }

    async enviarUltimoDato() {
      const ultimoDato = await this.datosService.obtenerUltimoDato();
      this.server.emit('ultimoDato', ultimoDato);
      console.log('Enviando último dato al frontend:', ultimoDato);
    }
    
}