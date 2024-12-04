import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tipo } from './entities/tipo.entity';

@Injectable()
export class TiposService {
  constructor(
    private readonly tipoRepository: Repository<Tipo>
  ){}

  findAll() {
    return this.tipoRepository.find();
  }
}
