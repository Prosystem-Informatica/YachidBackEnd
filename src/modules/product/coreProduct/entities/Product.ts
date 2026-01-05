import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { Category } from "../../category/entities/Category";
import { Enterprise } from "../../../enterprise/entities/Enterprise";
import { ProductFiscal } from "../../productFiscal/entities/ProductFiscal";
import { ProductPrice } from "../../productPrice/entities/ProductPrice";
import { ProductImage } from "../../productImage/entities/ProductImage";
import { ProductComposition } from "../../productComposition/entities/ProductComposition";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  enterprise_id!: number;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @Column({ nullable: true })
  category_id?: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @Column({ type: "varchar", length: 60 })
  code!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "varchar", length: 14, default: "SEM GTIN" })
  barcode!: string;

  @Column({ type: "varchar", length: 10, default: "UN" })
  unit!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  type?: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  stock_location?: string | null;

  @Column({ nullable: true })
  manufacturer_id?: number;

  @Column("decimal", { precision: 10, scale: 3, default: 0 })
  weight_gross!: number;

  @Column("decimal", { precision: 10, scale: 3, default: 0 })
  weight_net!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  packaging?: string;

  @Column("decimal", { precision: 10, scale: 3, default: 0 })
  stock_quantity!: number;

  @Column("decimal", { precision: 10, scale: 3, default: 0 })
  stock_minimum!: number;

  @Column("decimal", { precision: 10, scale: 3, default: 0 })
  stock_maximum!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  cost_price!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  profit_margin!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  sale_price!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => ProductFiscal, (fiscal) => fiscal.product, {
    cascade: true,
    onDelete: "CASCADE",
  })
  fiscalData?: ProductFiscal;

  @OneToMany(() => ProductPrice, (price) => price.product, {
    cascade: true,
    onDelete: "CASCADE",
  })
  prices?: ProductPrice[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
    onDelete: "CASCADE",
  })
  images?: ProductImage[];

  @ManyToMany(() => ProductComposition, { eager: true })
  @JoinTable({
    name: "product_composition_links",
    joinColumn: { name: "product_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "composition_id", referencedColumnName: "id" },
  })
  compositions?: ProductComposition[];
}
