import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductVariantDto {
    @IsNumber()
    productId!: number;

    @IsString()
    @IsNotEmpty()
    sku!: string;

    @IsString()
    @IsNotEmpty()
    color!: string;

    @IsString()
    @IsNotEmpty()
    size!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stock_quantity!: number;
}
