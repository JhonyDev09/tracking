import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as net from 'net';
import * as dgram from 'dgram';
import { Dato } from 'src/datos/entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private readonly tcpPort = 3001;
  private readonly udpPort = 3002;

  constructor(
    @InjectRepository(Dato)
    private readonly DatoRepository: Repository<Dato>,  // Repositorio de Dato
    @InjectRepository(Dispositivo)
    private readonly DispositivoRepository: Repository<Dispositivo> // Repositorio de Dispositivo
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
    const parsedData = this.parseDato(message);

    if (!parsedData || !parsedData.imei) {
      this.logger.error('No se pudo extraer el IMEI de los datos recibidos.');
      throw new Error('IMEI no encontrado en los datos recibidos');
    }

    // Log de los datos procesados antes de guardarlos
    this.logger.log('Datos procesados:', parsedData);

    // Guardar en la base de datos usando TypeORM
    await this.saveDato(parsedData);
  }

  private async saveDato(data: {
    imei: string;
    latitud: string;
    longitud: string;
    velocidad: number;
    combustible: number;
    fechahra: Date;
  }) {
    // Buscar el dispositivo por IMEI
    const dispositivo = await this.DispositivoRepository.findOne({
      where: { imei: data.imei },
    });

    if (!dispositivo) {
      this.logger.error(`No se encontró un dispositivo con el IMEI ${data.imei}`);
      throw new Error('Dispositivo no encontrado');
    }

    // Crear y asignar los datos
    const nuevoDato = new Dato();
    nuevoDato.latitud = data.latitud;
    nuevoDato.longitud = data.longitud;
    nuevoDato.velocidad = data.velocidad;
    nuevoDato.combustible = data.combustible;
    nuevoDato.fechahra = data.fechahra;
    nuevoDato.dispositivo = dispositivo; // Asignar el dispositivo encontrado

    await this.DatoRepository.save(nuevoDato);

    this.logger.log('Datos guardados en la base de datos con relación al dispositivo.');
  }

  private parseDato(data: string): {
    imei: string;
    latitud: string;
    longitud: string;
    velocidad: number;
    combustible: number;
    fechahra: Date;
  } | null {
    try {
      const parts = data.split(',');

      if (!parts[0].startsWith('imei:') || parts.length < 15) {
        this.logger.error('Formato de datos recibido incompleto o incorrecto.');
        return null;
      }

      // Extraer el IMEI
      const imei = parts[0].replace('imei:', '').trim();
      const fechahra = this.convertToFechaHora(parts[2], parts[5]); // Combinar fecha y hora recibidas


      // Extraer latitud y longitud en formato DMM (Grados y minutos)
      const latitudGrados = parts[7].substring(0, 2);  // Primeros 2 caracteres son grados de latitud
      const latitudMinutos = parts[7].substring(2);   // Los restantes son los minutos de latitud
      const latitudDireccion = parts[8];              // Dirección de latitud (N o S)

      const longitudGrados = parts[9].substring(0, 3); // Primeros 3 caracteres son grados de longitud
      const longitudMinutos = parts[9].substring(3);  // Los restantes son los minutos de longitud
      const longitudDireccion = parts[10];            // Dirección de longitud (E o W)

      // Convertir grados y minutos a formato decimal
      const latitudDecimal = this.convertToDecimal(latitudGrados, latitudMinutos, latitudDireccion);
      const longitudDecimal = this.convertToDecimal(longitudGrados, longitudMinutos, longitudDireccion);

      const velocidad = parseFloat(parts[11]) || 0; // Velocidad en km/h
      const combustible = parseFloat(parts[14].replace('%', '')) || 0; // Nivel de combustible

      return {
        imei,
        latitud: latitudDecimal.toFixed(6),
        longitud: longitudDecimal.toFixed(6),
        velocidad,
        combustible,
        fechahra,
      };
    } catch (error) {
      this.logger.error(`Error al parsear los datos GPS: ${error.message}`);
      return null;
    }
  }

  private convertToFechaHora(fecha: string, hora: string): Date {
    // fecha en formato ddMMyy y hora en formato hhmmss
    const day = parseInt(fecha.substring(4, 6), 10);
    const month = parseInt(fecha.substring(2, 4), 10) - 1; // Mes en JavaScript es 0-indexado
    const year = 2000 + parseInt(fecha.substring(0, 2), 10); // Ajuste de año (20xx)
  
    const hours = parseInt(hora.substring(6, 8), 10);
    const minutes = parseInt(hora.substring(8, 10), 10);
    const seconds = parseInt(hora.substring(10, 12), 10);
  
    // Crear la fecha en UTC directamente
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  }
  

  // Función auxiliar para convertir grados y minutos a decimal
  private convertToDecimal(grados: string, minutos: string, direccion: string): number {
    const gradosNum = parseInt(grados, 10);
    const minutosNum = parseFloat(minutos) / 60;
    let decimal = gradosNum + minutosNum;

    // Si la dirección es Sur o Oeste, hacer la coordenada negativa
    if (direccion === 'S' || direccion === 'W') {
      decimal = -decimal;
    }

    return decimal;
  }
}
