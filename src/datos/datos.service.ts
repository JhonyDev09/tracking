import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { CreateDatoDto } from './dto/create-dato.dto';

@Injectable()
export class DatosService {
  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,
    
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async saveData(createDatoDto: CreateDatoDto) {
    const { imei, latitud, longitud, velocidad, combustible, fechahra } = createDatoDto;

    // Buscar dispositivo por IMEI
    const dispositivo = await this.dispositivoRepository.findOne({ where: { imei } });

    if (!dispositivo) {
      throw new Error('Dispositivo no encontrado');
    }

    // Crear un nuevo dato y relacionarlo con el dispositivo
    const nuevoDato = this.datoRepository.create({
      latitud,
      longitud,
      velocidad,
      combustible,
      fechahra,
      dispositivo,
    });

    // Guardar el dato en la base de datos
    return await this.datoRepository.save(nuevoDato);
  }
}
