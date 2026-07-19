import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  slug!: string;

  @IsString()
  description!: string;

  @IsDate()
  created_date!: Date;

  @IsDate()
  updated_date!: Date;
}
