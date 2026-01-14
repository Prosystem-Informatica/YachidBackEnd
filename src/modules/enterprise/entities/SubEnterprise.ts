import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Enterprise } from "./Enterprise";

@Entity("sub_enterprises")
export class SubEnterprise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.subEnterprises, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "enterprise_id" })
  enterprise!: Enterprise;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 20 })
  cnpj_cpf!: string;

  @Column({ type: "varchar", length: 1, default: "2" })
  environment!: "1" | "2";

  @Column({ type: "varchar", length: 50, nullable: true })
  tipo_regime?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  codigo_cidade?: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  inscricao_estadual?: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  inscricao_municipal?: string | null;

  @Column({ type: "json", nullable: true })
  address?: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
  } | null;

  @Column({ type: "json", nullable: true })
  contabilidade?: {
    contabilidade: string;
    cnpj: string;
    cep: string;
    endereco: string;
    bairro: string;
    numero: string;
    cidade: string;
  } | null;

  @Column({ type: "json", nullable: true })
  receita?: {
    regime_tributario_issqn?: string;
    ind_ret_issqn?: string;
    receita_bruta_12m?: number;
    aliquota?: number;
    pis?: number;
    cofins?: number;
    icms?: number;
    ibc_uf?: number;
    ibs_mun?: number;
    cbs?: number;
  } | null;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
