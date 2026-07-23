import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VariantAttribute } from './entities/variant-attribute.entity';
import { Repository } from 'typeorm';
import { ProductVariant } from '../product-variant/entities/product-variant.entity';

@Injectable()
export class VariantAttributeService {
  constructor(
    @InjectRepository(VariantAttribute)
    private readonly variantAtributeRepository: Repository<VariantAttribute>,

    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,
  ) {}

  async create(createVariantAttributeDto: CreateVariantAttributeDto) {
    //check if the product variant exists
    const productVariant = await this.productVariantRepository.findOne({
      where: {
        id: createVariantAttributeDto.productVariantId,
      },
    });

    if (!productVariant) {
      throw new NotFoundException('Product variant not found');
    }

    const variantAttribute = await this.variantAtributeRepository.create({
      attribute_name: createVariantAttributeDto.attribute_name,
      attribute_value: createVariantAttributeDto.attribute_value,
    });

    try {
      return this.variantAtributeRepository.save(variantAttribute);
    } catch (error) {
      throw new BadRequestException('Variant attribute creation fail');
    }
  }

  findAll() {
    return this.variantAtributeRepository.find({
      relations: {
        productVariant: true,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.variantAtributeRepository.findOne({
      where: { id },
      relations: {
        productVariant: true,
      },
    });
  }

  async update(
    id: number,
    updateVariantAttributeDto: UpdateVariantAttributeDto,
  ) {
    // Check if the attribute exists
    const attribute = await this.variantAtributeRepository.findOne({
      where: { id },
      relations: {
        productVariant: true,
      },
    });

    if (!attribute) {
      throw new NotFoundException('Variant attribute not found');
    }

    // If the productVariantId is being changed, validate it
    if (updateVariantAttributeDto.productVariantId) {
      const productVariant = await this.productVariantRepository.findOne({
        where: {
          id: updateVariantAttributeDto.productVariantId,
        },
      });

      if (!productVariant) {
        throw new NotFoundException('Product variant not found');
      }

      attribute.productVariant = productVariant;
    }

    // Copy all other provided properties
    Object.assign(attribute, {
      attribute_name: updateVariantAttributeDto.attribute_name,
      attribute_value: updateVariantAttributeDto.attribute_value,
    });

    try {
      return await this.variantAtributeRepository.save(attribute);
    } catch (error) {
      throw new BadRequestException('Variant attribute update failed');
    }
  }

  async remove(id: number) {
    const result = await this.productVariantRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('variant id not found');
    }
    return {
      message: 'variant attribute deleted successfully.',
    };
  }
}
