import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(ProductImage)
    private readonly productRepository: Repository<Product>
  ) {}

  async uploadProductImage(productId: number, file: Express.Multer.File){
    //check if the product exisit 
    const product = await this.productRepository.findOne({
      where: {
        id: productId
      }
    });

    if(!product){
      throw new NotFoundException('Product not found')
    }

    //find next sort order
    const imageCount = await this.productImageRepository.count({
      where: { id: productId },
    });

    const image = this.productImageRepository.create({
      id: productId,
      image_url: `products/${file.filename}`,
      sort_order: imageCount+1
    });

    return this.productImageRepository.save(image);
  }

  create(createProductImageDto: CreateProductImageDto) {
    return 'This action adds a new productImage';
  }

  findAll() {
    return `This action returns all productImages`;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
      order: {
        images: {
          sort_order: 'ASC',
        },
      },
    });
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    return `This action updates a #${id} productImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} productImage`;
  }
}
