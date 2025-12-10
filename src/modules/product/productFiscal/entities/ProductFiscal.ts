import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Product } from "../../coreProduct/entities/Product";

@Entity("product_fiscal")
export class ProductFiscal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_id!: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "varchar", length: 8, nullable: true })
  ncm?: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  cest?: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  cfop?: string;

  @Column({ type: "varchar", length: 5, default: "102" })
  cst!: string;

  @Column({ type: "varchar", length: 1, default: "0" })
  origin!: string;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  icms_rate!: number;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  ipi_rate!: number;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  pis_rate!: number;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  cofins_rate!: number;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  pCredSN!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  vCredICMSSN!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
