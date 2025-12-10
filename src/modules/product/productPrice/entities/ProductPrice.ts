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

@Entity("product_prices")
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "varchar", length: 100 })
  table_name!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  sale_price!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
