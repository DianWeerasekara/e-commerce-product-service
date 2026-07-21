import { IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(()=>Product, (products)=> products.variant, {
        nullable: true
    })
    @JoinColumn({name: "product_id"})
    productId!: Product;

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
    stock_quntity!: number;
}