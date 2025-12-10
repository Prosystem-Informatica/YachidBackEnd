import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "../../category/entities/Category";
import { Enterprise } from "../../../enterprise/entities/Enterprise";
import { Manufacturer } from "../../manufacturer/entities/Manufacturer.entity";
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

  @ManyToOne(() => Manufacturer, { nullable: true })
  @JoinColumn({ name: "manufacturer_id" })
  manufacturer?: Manufacturer;

  @Column({ nullable: true })
  manufacturer_id?: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  classification?: string;

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

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ProductFiscal, (fiscal) => fiscal.product)
  fiscalData?: ProductFiscal[];

  @OneToMany(() => ProductPrice, (price) => price.product)
  prices?: ProductPrice[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images?: ProductImage[];

  @OneToMany(() => ProductComposition, (comp) => comp.parent_product)
  composition?: ProductComposition[];

  @OneToMany(() => ProductComposition, (comp) => comp.component_product)
  used_in_compositions?: ProductComposition[];
}
