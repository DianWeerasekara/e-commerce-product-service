import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UpdateDateColumn } from "typeorm/browser";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    slug!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_date!: Date
}
