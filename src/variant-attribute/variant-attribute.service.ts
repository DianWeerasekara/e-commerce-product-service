import { Injectable } from '@nestjs/common';
import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';

@Injectable()
export class VariantAttributeService {
  create(createVariantAttributeDto: CreateVariantAttributeDto) {
    return 'This action adds a new variantAttribute';
  }

  findAll() {
    return `This action returns all variantAttribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantAttribute`;
  }

  update(id: number, updateVariantAttributeDto: UpdateVariantAttributeDto) {
    return `This action updates a #${id} variantAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantAttribute`;
  }
}
