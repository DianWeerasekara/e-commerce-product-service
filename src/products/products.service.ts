import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    console.log(newProduct)
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOne({where: {id}});

    if(!result) {
      throw new NotFoundException(`Product containing this ID of ${id} not found`)
    }

    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const result = await this.productRepository.update(id, updateProductDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Product ID: ${id} not found`);
    }

    return this.findOne(id)
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);

    if(result.affected) {
      throw new NotFoundException(`Product ID: ${id} not found`);
    }

    return 'Product deleated succefully'
  }
}
