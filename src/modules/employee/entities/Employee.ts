import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  cnpj_cpf!: string | null;

  @Column()
  enterprise_name!: string;

  @Column({ default: true })
  status!: boolean;

  @Column()
  role!: string;

  @CreateDateColumn()
  created_at!: Date;
}
