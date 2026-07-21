import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { ProductVariant } from "../../product-variant/entities/product-variant.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Category, (category) => category.products, {
        nullable: true,
    })
    @JoinColumn({name: "category_id"})
    category!: Category;

    @Column()
    name!: string;

    @Column()
    slug!: string;

    @Column()
    description!: string;

    @Column()
    sku!: string;

    @Column()
    brand!: string;

    @Column()
    price!: number;

    @Column()
    cost_price!: number;

    @Column()
    status!: boolean;

    @CreateDateColumn()
    created_on!: Date;

    @OneToMany(() => ProductVariant, (variant) => variant.productId)
    variant!: ProductVariant[]
}
