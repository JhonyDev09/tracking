import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ){}
  findAll() {
    return this.colorRepository.find();
  }

}
