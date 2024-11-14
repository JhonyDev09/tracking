import { Test, TestingModule } from '@nestjs/testing';
import { UsrUnidadService } from './usr-unidad.service';

describe('UsrUnidadService', () => {
  let service: UsrUnidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsrUnidadService],
    }).compile();

    service = module.get<UsrUnidadService>(UsrUnidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
