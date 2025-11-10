import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  enterprise_id!: number;

  @Column()
  customer_id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total!: number;

  @Column({ type: "varchar", length: 3 })
  model!: string;

  @Column({ type: "varchar", length: 10 })
  serie!: string;

  @Column({ type: "int" })
  number!: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  access_key?: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  protocol?: string | null;

  @Column({ type: "varchar", length: 20, default: "pending" })
  status!: "pending" | "authorized" | "denied" | "cancelled";

  @Column({ type: "datetime", nullable: true })
  issued_at?: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
