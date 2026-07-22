import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVariantAttributeDto {
  @IsInt()
  productVariantId!: number;

  @IsString()
  @IsNotEmpty()
  attribute_name!: string;

  @IsString()
  @IsNotEmpty()
  attribute_value!: string;
}
