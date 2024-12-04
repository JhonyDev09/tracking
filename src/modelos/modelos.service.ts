import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Modelo } from './entities/modelo.entity';


@Injectable()
export class ModelosService {
  constructor(
    private readonly modeloRepository: Repository<Modelo>
  ){}

  findAll(): Promise<Modelo[]> {
    return this.modeloRepository.find();
  }

}
