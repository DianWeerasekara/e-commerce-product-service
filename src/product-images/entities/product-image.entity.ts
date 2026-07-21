import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity()
export class ProductImage {
    @Column()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Product, (product) => product.images, {
        nullable: true
    })
    @JoinColumn({name: "product_id"})
    product!: Product;
    
    @Column()
    image_url!: string;

    @Column({default: 1})
    sort_order!: string;
}
