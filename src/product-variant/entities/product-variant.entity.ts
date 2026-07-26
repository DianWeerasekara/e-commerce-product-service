import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { VariantAttribute } from '../../variant-attribute/entities/variant-attribute.entity';

@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ unique: true })
  sku!: string;

  @Column()
  color!: string;

  @Column()
  size!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    default: 0,
  })
  stock_quantity!: number;

  @OneToMany(() => VariantAttribute, (attribute) => attribute.productVariant, {
    cascade: true,
  })
  variantAttributes!: VariantAttribute[];
}
