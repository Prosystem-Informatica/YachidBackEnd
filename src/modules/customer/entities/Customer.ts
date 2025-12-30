import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  name!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  email?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string | null;

  @Column({ type: "varchar", length: 20 })
  cnpj_cpf!: string;

  @Column({ type: "varchar", length: 15, default: "F" })
  person_type!: "F" | "J";

  @Column({ type: "varchar", length: 30, nullable: true })
  inscricao_estadual?: string | null;

  @Column({ type: "varchar", length: 100 })
  enterprise_name!: string;

  @Column({ default: true })
  status!: boolean;

  @Column({ default: false })
  restriction!: boolean;

  @Column({ type: "float", nullable: true })
  credit?: number;

  @Column({ type: "json", nullable: true })
  address?: string | null;

  @CreateDateColumn()
  created_at!: Date;
}
