import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { Repository } from 'typeorm';
import { ProductVariant } from './entities/product-variant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariant)
    private readonly productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    //check if the product exists
    const product = await this.productRepository.findOne({
      where: {
        id: createProductVariantDto.productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product id not found');
    }

    const newVariant = this.productVariantRepository.create({
      product: product,
      sku: createProductVariantDto.sku,
      color: createProductVariantDto.color,
      size: createProductVariantDto.size,
      price: createProductVariantDto.price,
      stock_quantity: createProductVariantDto.stock_quantity,
    });

    try {
      return this.productVariantRepository.save(newVariant);
    } catch (error: any) {
      throw new BadRequestException(
        `Product variant creation fail, ${error.message}`,
      );
    }
  }

  findAll() {
    return this.productVariantRepository.find({
      relations: {
        product: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      const productVariant = await this.productVariantRepository.findOne({
        where: { id },
        relations: {
          product: true,
        },
      });

      return productVariant;
    } catch (error: any) {
      throw new BadRequestException(
        `Failed to fetch product variant: ${error.message}`,
      );
    }
  }

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    try {
      const variant = await this.productVariantRepository.findOne({
        where: { id },
        relations: {
          product: true,
        },
      });

      if (!variant) {
        throw new NotFoundException(`Product variant with ID ${id} not found`);
      }

      // If productId is being updated
      if (updateProductVariantDto.productId) {
        const product = await this.productRepository.findOne({
          where: { id: updateProductVariantDto.productId },
        });

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        variant.product = product;
      }

      Object.assign(variant, {
        sku: updateProductVariantDto.sku ?? variant.sku,
        color: updateProductVariantDto.color ?? variant.color,
        size: updateProductVariantDto.size ?? variant.size,
        price: updateProductVariantDto.price ?? variant.price,
        stock_quntity:
          updateProductVariantDto.stock_quantity ?? variant.stock_quantity,
      });

      return await this.productVariantRepository.save(variant);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        `Failed to update product variant: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const variant = await this.productVariantRepository.findOne({
        where: { id },
      });

      if (!variant) {
        throw new NotFoundException(`Product variant with ID ${id} not found`);
      }

      await this.productVariantRepository.remove(variant);

      return {
        message: 'Product variant deleted successfully',
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(
        `Failed to delete product variant: ${error.message}`,
      );
    }
  }
}
