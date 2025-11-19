import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("enterprises")
export class Enterprise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: true })
  status!: boolean;

  @Column({ type: "longtext", nullable: true })
  logo?: string | null;

  @Column({ type: "varchar", length: 20 })
  cnpj_cpf!: string;

  @Column({ type: "json", nullable: true })
  branches?: string[] | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  cert_filename?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  cert_password?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  csc_id?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  csc_token?: string | null;

  @Column({ type: "varchar", length: 1, default: "2" })
  environment!: "1" | "2";

  @Column({ type: "varchar", length: 1000, nullable: true })
  address!: string | null;

  @CreateDateColumn()
  created_at!: Date;
}
