import { Injectable, Logger } from '@nestjs/common';
import { DatosService } from '../datos/datos.service';  
import * as net from 'net';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private readonly port = 3000;

  constructor(
    private readonly datosService: DatosService,  // Inyecta el servicio de datos
  ) {
    this.createTCPServer();
  }

  private createTCPServer() {
    const server = net.createServer(async (socket) => {
      this.logger.log('Nueva conexión establecida con el GPS');

      socket.on('data', async (data) => {
        const message = data.toString();
        this.logger.log(`Datos recibidos: ${message}`);

        try {
          await this.handleIncomingData(message);
        } catch (error) {
          this.logger.error(`Error al procesar los datos: ${error.message}`);
        }
      });

      socket.on('error', (error) => {
        this.logger.error(`Socket error: ${error.message}`);
      });

      socket.on('close', () => {
        this.logger.log('Conexión cerrada');
      });
    });

    server.listen(this.port, '0.0.0.0', () => {
      this.logger.log(`Servidor TCP escuchando en el puerto ${this.port}`);
    });
  }

  private async handleIncomingData(message: string) {
    const parsedData = this.parseGPSData(message);

    const dispositivo = await this.datosService.findDispositivoByImei(parsedData.imei);  // Utiliza el servicio de datos
    if (!dispositivo) {
      this.logger.error('Dispositivo no encontrado con IMEI: ' + parsedData.imei);
      throw new Error('Dispositivo no encontrado');
    }

    const nuevoDato = await this.datosService.saveData({
      imei: parsedData.imei,
      latitud: parsedData.latitud,
      longitud: parsedData.longitud,
      velocidad: parsedData.velocidad,
      combustible: parsedData.combustible,
      fechahra: parsedData.fechahra,
    });

    this.logger.log('Datos guardados correctamente en la base de datos');
  }

  private parseGPSData(data: string): {
    imei: string;
    latitud: string;
    longitud: string;
    velocidad: number;
    combustible: number;
    fechahra: string;
  } {
    const [imei, latitud, longitud, velocidad, combustible, fechahra] = data.split(',');

    return {
      imei,
      latitud,
      longitud,
      velocidad: parseInt(velocidad, 10),
      combustible: parseInt(combustible, 10),
      fechahra,
    };
  }
}
