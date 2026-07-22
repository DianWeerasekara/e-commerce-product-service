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
    private readonly productVariantRepository: Repository<ProductVariant>
  ){}

  async create(createVariantAttributeDto: CreateVariantAttributeDto) {
    //check if the product variant exists 
    const productVariant = await this.productVariantRepository.findOne({
      where: {
        id: createVariantAttributeDto.productVariantId
      }
    });

    if(!productVariant){
      throw new NotFoundException('Product variant not found');
    }

    const variantAttribute = await this.variantAtributeRepository.create({
      attribute_name: createVariantAttributeDto.attribute_name,
      attribute_value: createVariantAttributeDto.attribute_value
    });

    try {
      return this.variantAtributeRepository.save(variantAttribute);
    } catch (error) {
      throw new BadRequestException('Variant attribute creation fail')
    }
  }

  findAll() {
    return this.variantAtributeRepository.find({
      relations: {
        productVariant: true
      }
    });
  }

  async findOne(id: number) {
    const result = await this.productVariantRepository.findOne({
      where: {id},
      relations: {
        variantAttributes: true
      }
    })
  }

  update(id: number, updateVariantAttributeDto: UpdateVariantAttributeDto) {
    return `This action updates a #${id} variantAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantAttribute`;
  }
}
