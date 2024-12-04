import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Modelo } from './entities/modelo.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
  ){}

  findAll(): Promise<Modelo[]> {
    return this.modeloRepository.find();
  }

}
