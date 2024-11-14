import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';

@Injectable()
export class DatosService {
  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,  // Inyecta el repositorio de Dato
  ) {}

  async create(dato: any) {
    const nuevoDato = this.datoRepository.create(dato);
    return await this.datoRepository.save(nuevoDato);
  }

  async obtenerUltimoDato(): Promise<Dato> {
    const ultimoDato = await this.datoRepository.findOne({
      order: {
        fechahra: 'DESC',  // Asegúrate de que esta propiedad esté bien definida en tu entidad
      },
    });
  
    if (!ultimoDato) {
      console.error('No se encontró el último dato.');
    }
  
    return ultimoDato;
  }

}


