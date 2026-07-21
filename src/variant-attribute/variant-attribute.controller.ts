import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantAttributeService } from './variant-attribute.service';
import { CreateVariantAttributeDto } from './dto/create-variant-attribute.dto';
import { UpdateVariantAttributeDto } from './dto/update-variant-attribute.dto';

@Controller('variant-attribute')
export class VariantAttributeController {
  constructor(private readonly variantAttributeService: VariantAttributeService) {}

  @Post()
  create(@Body() createVariantAttributeDto: CreateVariantAttributeDto) {
    return this.variantAttributeService.create(createVariantAttributeDto);
  }

  @Get()
  findAll() {
    return this.variantAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantAttributeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantAttributeDto: UpdateVariantAttributeDto) {
    return this.variantAttributeService.update(+id, updateVariantAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantAttributeService.remove(+id);
  }
}
