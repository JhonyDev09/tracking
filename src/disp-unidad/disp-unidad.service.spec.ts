import { Test, TestingModule } from '@nestjs/testing';
import { DispUnidadService } from './disp-unidad.service';

describe('DispUnidadService', () => {
  let service: DispUnidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispUnidadService],
    }).compile();

    service = module.get<DispUnidadService>(DispUnidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
