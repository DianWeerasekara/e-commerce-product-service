import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ProductImage } from '../../product-images/entities/product-image.entity';
import { ProductVariant } from '../../product-variant/entities/product-variant.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column('text')
  description!: string;

  @Column({ unique: true })
  sku!: string;

  @Column()
  brand!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  cost_price!: number;

  @Column({
    default: true,
  })
  status!: boolean;

  @CreateDateColumn()
  created_on!: Date;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images!: ProductImage[];

  @OneToMany(() => ProductVariant, (variant) => variant.product, {
    cascade: true,
  })
  variants!: ProductVariant[];
}
