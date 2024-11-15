import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispositivo } from './entities/dispositivo.entity';
import { Repository } from 'typeorm';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';


@Injectable()
export class DispositivosService {
  constructor(
    @InjectRepository(Dispositivo)
    private dispositivosRepository: Repository<Dispositivo>,
  ){}

  async create(crateDispositivoDto: CreateDispositivoDto): Promise<Dispositivo>{
    const dispositivo = this.dispositivosRepository.create(crateDispositivoDto);
    return await this.dispositivosRepository.save(dispositivo);
  }

  async findAll(): Promise<Dispositivo[]>{
    return this.dispositivosRepository.find();
  }

}
