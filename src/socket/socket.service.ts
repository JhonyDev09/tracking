import { Injectable, Logger } from '@nestjs/common';
import * as net from 'net';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from '../datos/entities/dato.entity';
import { Dispositivo } from '../dispositivos/entities/dispositivo.entity';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private readonly port = 3000;

  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,

    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
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

    const dispositivo = await this.dispositivoRepository.findOne({ where: { imei: parsedData.imei } });
    if (!dispositivo) {
      this.logger.error('Dispositivo no encontrado con IMEI: ' + parsedData.imei);
      throw new Error('Dispositivo no encontrado');
    }

    const nuevoDato = this.datoRepository.create({
      latitud: parsedData.latitud,
      longitud: parsedData.longitud,
      velocidad: parsedData.velocidad,
      combustible: parsedData.combustible,
      fechahra: parsedData.fechahra,
      dispositivo,
    });

    await this.datoRepository.save(nuevoDato);
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
