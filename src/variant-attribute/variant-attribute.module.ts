import { Module } from '@nestjs/common';
import { VariantAttributeService } from './variant-attribute.service';
import { VariantAttributeController } from './variant-attribute.controller';

@Module({
  controllers: [VariantAttributeController],
  providers: [VariantAttributeService],
})
export class VariantAttributeModule {}
