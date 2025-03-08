import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as net from 'net';
import * as dgram from 'dgram';
import { Dato } from 'src/datos/entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { UbicacionesGateway } from 'src/ubicaciones/ubicaciones.gateway';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private readonly tcpPort = 3001;
  private readonly udpPort = 3002;
  private clients: Set<net.Socket> = new Set();

  constructor(
    @InjectRepository(Dato)
    private readonly DatoRepository: Repository<Dato>,
    @InjectRepository(Dispositivo)
    private readonly DispositivoRepository: Repository<Dispositivo>,
    private readonly ubicacionesGateway: UbicacionesGateway
  ) {
    this.createTCPServer();
    this.createUDPServer();
  }

  private createTCPServer() {
    const server = net.createServer((socket) => {
      this.logger.log(`Nueva conexión TCP: ${socket.remoteAddress}:${socket.remotePort}`);
      this.clients.add(socket);

      socket.on('data', async (data) => {
        const message = data.toString();
        this.logger.log(`Datos TCP recibidos: ${message}`);
        this.processData(message);
      });

      socket.on('error', (error) => this.logger.error(`Error en TCP: ${error.message}`));
      socket.on('close', () => {
        this.logger.log(`Conexión TCP cerrada: ${socket.remoteAddress}:${socket.remotePort}`);
        this.clients.delete(socket);
      });
    });

    server.listen(this.tcpPort, '0.0.0.0', () => {
      this.logger.log(`Servidor TCP activo en el puerto ${this.tcpPort}`);
    });
  }

  private createUDPServer() {
    const udpServer = dgram.createSocket('udp4');

    udpServer.on('message', async (msg, rinfo) => {
      const message = msg.toString();
      this.logger.log(`Datos UDP recibidos desde ${rinfo.address}:${rinfo.port}: ${message}`);
      this.processData(message);
    });

    udpServer.on('error', (error) => {
      this.logger.error(`Error en UDP: ${error.message}`);
      udpServer.close();
    });

    udpServer.bind(this.udpPort, () => {
      this.logger.log(`Servidor UDP activo en el puerto ${this.udpPort}`);
    });
  }

  private async processData(message: string) {
    try {
      setImmediate(async () => {
        const parsedData = this.parseDato(message);
        if (!parsedData) return;
        await this.saveDato(parsedData);
      });
    } catch (error) {
      this.logger.error(`Error procesando datos: ${error.message}`);
    }
  }

  private async saveDato(data: { imei: string; latitud: string; longitud: string; velocidad: number; aceite: number; fechahra: Date; }) {
    const dispositivo = await this.DispositivoRepository.findOne({ where: { imei: data.imei } });
    if (!dispositivo) {
      this.logger.warn(`Dispositivo no encontrado para IMEI ${data.imei}`);
      return;
    }

    const nuevoDato = this.DatoRepository.create({ ...data, dispositivo });
    await this.DatoRepository.save(nuevoDato);
    this.ubicacionesGateway.enviarUltimoDato();

    this.logger.log(`Datos guardados correctamente para IMEI ${data.imei}`);
  }

  private parseDato(data: string): { imei: string; latitud: string; longitud: string; velocidad: number; aceite: number; fechahra: Date; } | null {
    try {
      const parts = data.split(',');
      if (!parts[0].startsWith('imei:') || parts.length < 15) return null;

      const imei = parts[0].replace('imei:', '').trim();
      const fechahra = this.convertToFechaHora(parts[2]);

      const latitudDecimal = this.convertToDecimal(parts[7].substring(0, 2), parts[7].substring(2), parts[8]);
      const longitudDecimal = this.convertToDecimal(parts[9].substring(0, 3), parts[9].substring(3), parts[10]);

      return {
        imei,
        latitud: latitudDecimal.toFixed(6),
        longitud: longitudDecimal.toFixed(6),
        velocidad: parseFloat(parts[11]) || 0,
        aceite: parseFloat(parts[14].replace('%', '')) || 0,
        fechahra,
      };
    } catch (error) {
      this.logger.error(`Error al parsear los datos GPS: ${error.message}`);
      return null;
    }
  }

  private convertToFechaHora(fechaHora: string): Date {
    const year = 2000 + parseInt(fechaHora.substring(0, 2), 10);
    const month = parseInt(fechaHora.substring(2, 4), 10) - 1;
    const day = parseInt(fechaHora.substring(4, 6), 10);
    const hours = parseInt(fechaHora.substring(6, 8), 10);
    const minutes = parseInt(fechaHora.substring(8, 10), 10);
    const seconds = parseInt(fechaHora.substring(10, 12), 10);
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  }

  private convertToDecimal(grados: string, minutos: string, direccion: string): number {
    const decimal = parseInt(grados, 10) + parseFloat(minutos) / 60;
    return direccion === 'S' || direccion === 'W' ? -decimal : decimal;
  }
}
