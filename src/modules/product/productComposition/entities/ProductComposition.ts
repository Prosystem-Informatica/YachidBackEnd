import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Product } from "../../coreProduct/entities/Product";

@Entity("product_compositions")
export class ProductComposition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 150, nullable: true })
  name?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("decimal", { precision: 10, scale: 3, default: 1 })
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  component_cost!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @ManyToMany(() => Product, (product) => product.compositions)
  used_in_products?: Product[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
