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
}


