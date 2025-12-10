import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Enterprise } from "../../../enterprise/entities/Enterprise";
import { Product } from "../../coreProduct/entities/Product";

@Entity("manufacturers")
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  enterprise_id!: number;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  cnpj?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  contact?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  address?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  city?: string;

  @Column({ type: "varchar", length: 2, nullable: true })
  state?: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  zip_code?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  website?: string;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @OneToMany(() => Product, (product) => product.manufacturer)
  products?: Product[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
