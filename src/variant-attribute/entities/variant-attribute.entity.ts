import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";

@Entity()
export class VariantAttribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.variantAttributes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_variant_id' })
  productVariant!: ProductVariant;

  @Column()
  attribute_name!: string;

  @Column()
  attribute_value!: string;
}
