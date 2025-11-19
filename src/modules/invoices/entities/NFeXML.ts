import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Enterprise } from "../../enterprise/entities/Enterprise";
import { Invoice } from "./envoice";

@Entity("nfe_xmls")
export class NFeXML {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  enterprise_id!: number;

  @Column()
  invoice_id!: number;

  @ManyToOne(() => Enterprise)
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @ManyToOne(() => Invoice)
  @JoinColumn({ name: "invoice_id" })
  invoice!: Invoice;

  @Column("longtext")
  xml!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  protocol?: string | null;

  @Column("text", { nullable: true })
  configuracoes?: string | null;

  @Column({ type: "datetime", nullable: true })
  issued_at?: Date | null;

  @CreateDateColumn()
  created_at!: Date;
}
