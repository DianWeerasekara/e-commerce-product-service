import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeService } from './variant-attribute.service';

describe('VariantAttributeService', () => {
  let service: VariantAttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantAttributeService],
    }).compile();

    service = module.get<VariantAttributeService>(VariantAttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
