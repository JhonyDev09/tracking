import { Injectable, Logger } from '@nestjs/common'; // Importa el Logger
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { CreateDatoDto } from './dto/create-dato.dto';

@Injectable()
export class DatosService {
  private readonly logger = new Logger(DatosService.name); // Crea una instancia de Logger

  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,
    
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async saveData(createDatoDto: CreateDatoDto) {
    const { imei, latitud, longitud, velocidad, combustible, fechahra } = createDatoDto;

    // Log para verificar los datos recibidos
    this.logger.log(`Recibiendo datos: IMEI: ${imei}, Latitud: ${latitud}, Longitud: ${longitud}, Velocidad: ${velocidad}, Combustible: ${combustible}, FechaHora: ${fechahra}`);

    // Buscar dispositivo por IMEI
    const dispositivo = await this.dispositivoRepository.findOne({ where: { imei } });
    if (!dispositivo) {
      this.logger.error('Dispositivo no encontrado con IMEI: ' + imei);
      throw new Error('Dispositivo no encontrado');
    }

    // Log si el dispositivo es encontrado
    this.logger.log(`Dispositivo encontrado: ${dispositivo.imei}`);

    // Crear y guardar un nuevo dato relacionado con el dispositivo
    const nuevoDato = this.datoRepository.create({
      latitud,
      longitud,
      velocidad,
      combustible,
      fechahra,
      dispositivo,
    });

    // Log antes de guardar el dato
    this.logger.log(`Guardando nuevo dato: ${JSON.stringify(nuevoDato)}`);

    // Guardar el nuevo dato
    return await this.datoRepository.save(nuevoDato);
  }
}
