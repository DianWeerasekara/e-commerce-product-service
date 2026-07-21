import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ProductVariantModule } from './product-variant/product-variant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    CategoryModule,

    ProductsModule,

    ProductVariantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
