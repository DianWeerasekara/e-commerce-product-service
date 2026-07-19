import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category)
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = this.categoryRepository.findOne({where: {id}});

    if(!category) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto);

    if(result.affected === 0){
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id); 

    if(result.affected === 0){
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return `Category with ID ${id} deleted`
  }
}
