import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';

@Injectable()
export class RolService {
  
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ){}

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

}
