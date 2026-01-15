import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Enterprise } from "../../enterprise/entities/Enterprise";
import { SubEnterprise } from "../../enterprise/entities/SubEnterprise";

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

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.employees, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @ManyToMany(() => SubEnterprise)
  @JoinTable({
    name: "employee_sub_enterprises",
    joinColumn: { name: "employee_id", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "sub_enterprise_id",
      referencedColumnName: "id",
    },
  })
  subEnterprises?: SubEnterprise[];

  @CreateDateColumn()
  created_at!: Date;
}
