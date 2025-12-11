import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "../../coreProduct/entities/Product";

@Entity("product_images")
export class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "varchar", length: 255 })
  image_url!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  caption?: string;

  @Column({ type: "boolean", default: false })
  is_main!: boolean;

  @Column({ type: "int", default: 0 })
  order!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
