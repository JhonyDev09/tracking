import { Injectable, Logger } from '@nestjs/common';
import { DatosService } from '../datos/datos.service';
import * as net from 'net';
import * as dgram from 'dgram';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private readonly tcpPort = 3001;
  private readonly udpPort = 3002;

  constructor(
    private readonly datosService: DatosService,  // Inyecta el servicio de datos
  ) {
    this.createTCPServer();
    this.createUDPServer();
  }

  private createTCPServer() {
    const server = net.createServer(async (socket) => {
      this.logger.log('Nueva conexión TCP establecida con el GPS');

      socket.on('data', async (data) => {
        const message = data.toString();
        
        // Log de datos crudos
        this.logger.log(`Datos recibidos por TCP (crudo): ${message}`);

        try {
          await this.handleIncomingData(message);
        } catch (error) {
          this.logger.error(`Error al procesar los datos TCP: ${error.message}`);
        }
      });

      socket.on('error', (error) => {
        this.logger.error(`Error en el socket TCP: ${error.message}`);
      });

      socket.on('close', () => {
        this.logger.log('Conexión TCP cerrada');
      });
    });

    server.listen(this.tcpPort, '0.0.0.0', () => {
      this.logger.log(`Servidor TCP escuchando en el puerto ${this.tcpPort}`);
    });
  }

  private createUDPServer() {
    const udpServer = dgram.createSocket('udp4');

    udpServer.on('message', async (msg, rinfo) => {
      const message = msg.toString();
      this.logger.log(`Datos recibidos por UDP (crudo) desde ${rinfo.address}:${rinfo.port}: ${message}`);

      try {
        await this.handleIncomingData(message);
      } catch (error) {
        this.logger.error(`Error al procesar los datos UDP: ${error.message}`);
      }
    });

    udpServer.on('error', (error) => {
      this.logger.error(`Error en el socket UDP: ${error.message}`);
      udpServer.close();
    });

    udpServer.bind(this.udpPort, () => {
      this.logger.log(`Servidor UDP escuchando en el puerto ${this.udpPort}`);
    });
  }

  private async handleIncomingData(message: string) {
    const parsedData = this.parseGPSData(message);

    if (!parsedData || !parsedData.imei) {
      this.logger.error('No se pudo extraer el IMEI de los datos recibidos.');
      throw new Error('IMEI no encontrado en los datos recibidos');
    }

    const dispositivo = await this.datosService.findDispositivoByImei(parsedData.imei);
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
  } | null {
    try {
      const [imei, latitud, longitud, velocidad, combustible, fechahra] = data.split(',');

      if (!imei || !latitud || !longitud || !velocidad || !combustible || !fechahra) {
        this.logger.error('Formato de datos recibido incompleto o incorrecto.');
        return null;
      }

      return {
        imei,
        latitud,
        longitud,
        velocidad: parseInt(velocidad, 10),
        combustible: parseInt(combustible, 10),
        fechahra,
      };
    } catch (error) {
      this.logger.error(`Error al parsear los datos GPS: ${error.message}`);
      return null;
    }
  }
}
