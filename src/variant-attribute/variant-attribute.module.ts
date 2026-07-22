import { Module } from '@nestjs/common';
import { VariantAttributeService } from './variant-attribute.service';
import { VariantAttributeController } from './variant-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantAttribute } from './entities/variant-attribute.entity';
import { ProductVariant } from '../product-variant/entities/product-variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantAttribute, ProductVariant])],
  controllers: [VariantAttributeController],
  providers: [VariantAttributeService],
})
export class VariantAttributeModule {}
