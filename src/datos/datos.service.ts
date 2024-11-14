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
    const ultimoDato = await this.datoRepository.find({
      order: {
        fechahra: 'DESC',  // Ordena de manera descendente por la fecha
      },
      take: 1,  // Solo toma el primer elemento después de ordenarlo
    });
  
    if (!ultimoDato || ultimoDato.length === 0) {
      console.error('No se encontró el último dato.');
      return null;
    }
  
    return ultimoDato[0];  // El primer elemento será el último
  }
  

}


