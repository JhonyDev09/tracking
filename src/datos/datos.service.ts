import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { CreateDatoDto } from './dto/create-dato.dto';

@Injectable()
export class DatosService {
  private readonly logger = new Logger(DatosService.name);

  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,
    
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async findDispositivoByImei(imei: string): Promise<Dispositivo | undefined> {
    return this.dispositivoRepository.findOne({ where: { imei } });
  }

  async saveData(createDatoDto: CreateDatoDto) {
    const { imei, latitud, longitud, velocidad, combustible, fechahra } = createDatoDto;

    this.logger.log(`Recibiendo datos: IMEI: ${imei}, Latitud: ${latitud}, Longitud: ${longitud}, Velocidad: ${velocidad}, Combustible: ${combustible}, FechaHora: ${fechahra}`);

    const dispositivo = await this.findDispositivoByImei(imei);  // Usar el nuevo método
    if (!dispositivo) {
      this.logger.error('Dispositivo no encontrado con IMEI: ' + imei);
      throw new NotFoundException('Dispositivo no encontrado');
    }
    
    // Crea un objeto parcial de tipo Dato
    const nuevoDato: Partial<Dato> = {
      latitud,
      longitud,
      velocidad,
      combustible,
      fechahra: fechahra,
      dispositivo,
    };

    // Usa "create" con el tipo "Partial<Dato>" y luego guarda el objeto
    const datoEntity = this.datoRepository.create(nuevoDato);
    return await this.datoRepository.save(datoEntity);
  }
}

