import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from 'src/datos/entities/dato.entity';  
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity'; 

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);

  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>, // Repositorio de Dato
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo> // Repositorio de Dispositivo
  ) {}

  // Función para procesar los datos crudos del GPS
  private parseGPSData(data: string): {
    imei: string;
    latitud: string;
    longitud: string;
    velocidad: number;
    combustible: number;
    fechahra: string;
  } | null {
    try {
      const parts = data.split(',');

      // Verificar que la estructura mínima esté presente y el mensaje comience con "imei:"
      if (!parts[0].startsWith('imei:') || parts.length < 12) {
        this.logger.error('Formato de datos recibido incompleto o incorrecto.');
        return null;
      }

      // Extraer el IMEI eliminando el prefijo "imei:"
      const imei = parts[0].replace('imei:', '').trim();

      // Extraer la fecha y hora del mensaje, si no está presente, usar la hora actual
      const fechahra = parts[2] || new Date().toISOString(); // Si no hay fecha, usamos la hora actual

      // Extraer la latitud y longitud en grados y minutos
      const latitudGrados = parts[7].substring(0, 2); // Los primeros dos dígitos para los grados
      const latitudMinutos = parts[7].substring(2); // Los otros dígitos para los minutos
      const latitud = parts[8] === 'N' ? 1 : -1; // Ajuste de signo (Norte: positivo, Sur: negativo)

      const longitudGrados = parts[9].substring(0, 3); // Los primeros tres dígitos para los grados
      const longitudMinutos = parts[9].substring(3); // Los otros dígitos para los minutos
      const longitud = parts[10] === 'E' ? 1 : -1; // Ajuste de signo (Este: positivo, Oeste: negativo)

      // Convertir grados y minutos a formato decimal
      const latitudDecimal = (parseInt(latitudGrados) + parseFloat(latitudMinutos) / 60) * latitud;
      const longitudDecimal = (parseInt(longitudGrados) + parseFloat(longitudMinutos) / 60) * longitud;

      // Obtener la velocidad en caso de que esté disponible, si no, asignar 0
      const velocidad = parseInt(parts[11], 10) || 0;

      // Extraer el nivel de combustible (aceite) en porcentaje
      const combustible = parseFloat(parts[14].replace('%', ''));

      return {
        imei,
        latitud: latitudDecimal.toFixed(6), // Devolver con 6 decimales
        longitud: longitudDecimal.toFixed(6), // Devolver con 6 decimales
        velocidad,
        combustible,
        fechahra,
      };
    } catch (error) {
      this.logger.error(`Error al parsear los datos GPS: ${error.message}`);
      return null;
    }
  }

  // Función para guardar los datos procesados en la base de datos usando TypeORM
  async saveGPSData(data: string, dispositivoId: number): Promise<Dato | null> {
    const processedData = this.parseGPSData(data);

    if (!processedData) {
      this.logger.error('No se pudo procesar los datos del GPS.');
      return null;
    }

    const { latitud, longitud, fechahra, velocidad, combustible } = processedData;

    try {
      // Crear la instancia de Dato
      const newDato = this.datoRepository.create({
        latitud,
        longitud,
        fechahra,
        velocidad,
        combustible,
        dispositivoId,
      });

      // Guardar los datos en la base de datos
      const savedDato = await this.datoRepository.save(newDato);
      this.logger.log(`Datos guardados correctamente para el dispositivo ${dispositivoId}: ${savedDato}`);
      return savedDato;
    } catch (error) {
      this.logger.error(`Error al guardar los datos en la base de datos: ${error.message}`);
      return null;
    }
  }
}
