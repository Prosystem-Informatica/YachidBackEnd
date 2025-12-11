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

@Entity("product_compositions")
export class ProductComposition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  parent_product_id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_product_id" })
  parent_product!: Product;

  @Column()
  component_product_id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "component_product_id" })
  component_product!: Product;

  @Column("decimal", { precision: 10, scale: 3, default: 1 })
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  component_cost!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
