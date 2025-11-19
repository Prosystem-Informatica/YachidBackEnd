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

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "varchar", length: 10 })
  cfop!: string;

  @Column({ type: "varchar", length: 10 })
  ncm!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  category?: string | null;

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
