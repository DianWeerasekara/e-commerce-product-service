import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);

          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);

    return {
      filename: file.filename,
      path: file.path,
    };
  }

  // @Post()
  // create(@Body() createProductImageDto: CreateProductImageDto) {
  //   return this.productImagesService.create(createProductImageDto);
  // }

  @Get()
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productImagesService.update(+id, updateProductImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productImagesService.remove(+id);
  }
}
