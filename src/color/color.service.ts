import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Repository } from 'typeorm';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorService {
  constructor(
    private readonly colorRepository: Repository<Color>
  ){}
  findAll() {
    return this.colorRepository.find();
  }

}
