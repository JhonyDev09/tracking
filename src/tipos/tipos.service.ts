import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tipo } from './entities/tipo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ){}

  findAll() {
    return this.tipoRepository.find();
  }
}
