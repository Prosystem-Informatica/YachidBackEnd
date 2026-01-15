import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Enterprise } from "../../enterprise/entities/Enterprise";

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
  role!: string;

  @Column({ default: true })
  status!: boolean;

  @ManyToOne(() => Enterprise)
  enterprise!: Enterprise;

  @ManyToMany(() => Enterprise)
  @JoinTable({
    name: "employee_sub_enterprises",
    joinColumn: { name: "employee_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "enterprise_id", referencedColumnName: "id" },
  })
  subEnterprises!: Enterprise[];

  @CreateDateColumn()
  created_at!: Date;
}
