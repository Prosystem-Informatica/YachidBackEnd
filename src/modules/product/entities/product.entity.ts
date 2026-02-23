import { BaseEntity } from 'src/config/db/base.entity';
import { TipoCusto } from 'src/core/enum/enums';
import { Entity, Column, OneToMany } from 'typeorm';
import { ProductComponent } from './product-component.entity';
import { ProductStock } from './product-stock.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  codigo: string;

  @Column({ nullable: true })
  ultimo_codigo: string;

  @Column({ nullable: true })
  penultimo_codigo: string;

  @Column({ nullable: true })
  linha: string;

  @Column({ nullable: true })
  cod_barras: string;

  @Column({ default: true })
  status: boolean;

  @Column()
  produto: string;

  @Column({ nullable: true })
  tipo: string;

  @Column({ nullable: true })
  familia: string;

  @Column({ nullable: true })
  unidade: string;

  @Column({ nullable: true })
  fabricante: string;

  @Column({ nullable: true })
  gramatura: string;

  @Column({ default: false })
  calcula_icms: boolean;

  @Column({ nullable: true })
  cod_tributario: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  peso_bruto: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  peso_liquido: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  peso_produto: number;

  @Column({ nullable: true })
  embalagem: string;

  @Column({ nullable: true })
  classificacao: string;

  @Column({ type: 'int', nullable: true })
  validade: number;

  @Column({ default: false })
  produto_avulso: boolean;

  @Column({ type: 'enum', enum: TipoCusto, default: TipoCusto.CALCULADO })
  tipo_custo: TipoCusto;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  custo_calculado: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  custo_digitado: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  custo_medio: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  ultimo_custo: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  penultimo_custo: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  ant_pen_custo: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  preco_min_7: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  preco_min_12: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  preco_min_18: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  preco_tabela: number;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  preco_anterior: number;

  @OneToMany(() => ProductStock, (stock) => stock.product)
  stocks: ProductStock[];

  @OneToMany(() => ProductComponent, (component) => component.product)
  components: ProductComponent[];
}
