import { Test, TestingModule } from '@nestjs/testing';
import { VariantAttributeController } from './variant-attribute.controller';
import { VariantAttributeService } from './variant-attribute.service';

describe('VariantAttributeController', () => {
  let controller: VariantAttributeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantAttributeController],
      providers: [VariantAttributeService],
    }).compile();

    controller = module.get<VariantAttributeController>(VariantAttributeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
