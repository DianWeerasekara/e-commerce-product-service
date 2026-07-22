import { IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { Product } from "../../products/entities/product.entity";
import { VariantAttribute } from "../../variant-attribute/entities/variant-attribute.entity";

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (products) => products.variant, {
    nullable: true,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column()
  @IsString()
  sku!: string;

  @Column()
  @IsString()
  color!: string;

  @Column()
  @IsString()
  size!: string;

  @Column()
  @IsNumber()
  price!: number;

  @Column()
  @IsNumber()
  stock_quantity!: number;

  @OneToMany(() => VariantAttribute, (attribute) => attribute.productVariant)
  variantAttributes!: VariantAttribute[];
}