import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: createProductDto.category,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    const product = this.productRepository.create({
      name: createProductDto.name,
      slug: createProductDto.slug,
      description: createProductDto.description,
      sku: createProductDto.sku,
      brand: createProductDto.brand,
      price: createProductDto.price,
      cost_price: createProductDto.cost_price,
      status: createProductDto.status,
      category,
    });

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException('Failed to create product.');
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true
      },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.category) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: updateProductDto.category,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found.');
      }

      product.category = category;
    }

    Object.assign(product, {
      name: updateProductDto.name ?? product.name,
      slug: updateProductDto.slug ?? product.slug,
      description: updateProductDto.description ?? product.description,
      sku: updateProductDto.sku ?? product.sku,
      brand: updateProductDto.brand ?? product.brand,
      price: updateProductDto.price ?? product.price,
      cost_price: updateProductDto.cost_price ?? product.cost_price,
      status: updateProductDto.status ?? product.status,
    });

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException('Failed to update product.');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return {
      message: 'Product deleted successfully.',
    };
  }
}
