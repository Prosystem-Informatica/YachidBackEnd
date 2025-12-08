import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Enterprise } from "../../enterprise/entities/Enterprise";
import { Category } from "../../category/entities/Category";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 60 })
  cProd!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @Column({ nullable: true })
  category_id?: number;

  @Column({ type: "varchar", length: 8 })
  ncm!: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  cest?: string | null;

  @Column({ type: "varchar", length: 10 })
  cfop!: string;

  @Column({ type: "varchar", length: 10, default: "UN" })
  uCom!: string;

  @Column({ type: "varchar", length: 10, default: "UN" })
  uTrib!: string;

  @Column({ type: "varchar", length: 14, default: "SEM GTIN" })
  cEAN!: string;

  @Column({ type: "varchar", length: 14, default: "SEM GTIN" })
  cEANTrib!: string;

  @Column({ type: "varchar", length: 5, default: "102" })
  cst!: string;

  @Column({ type: "varchar", length: 1, default: "0" })
  orig!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  icms_rate!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  ipi_rate!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  pis_rate!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  cofins_rate!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  pCredSN!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  vCredICMSSN!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  cost_price!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  profit_margin!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  profit_value!: number;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "boolean", default: true })
  status!: boolean;

  @Column()
  enterprise_id!: number;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
