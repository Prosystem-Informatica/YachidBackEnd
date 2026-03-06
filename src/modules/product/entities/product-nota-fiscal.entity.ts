import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ProductIvaItem } from './product-iva-item.entity';

@Entity('product_nota_fiscal')
export class ProductNotaFiscal extends BaseEntity {
  @Column({ nullable: true })
  iva_estado: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
  iva_valor: number;

  @Column({ nullable: true })
  ncm: string;

  @Column({ nullable: true })
  cest: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  reducao_perc: number;

  @Column({ nullable: true })
  origem_icms: string;

  @Column({ nullable: true })
  sit_tributaria_icms: string;

  @Column({ nullable: true })
  cst_ibs: string;

  @Column({ nullable: true })
  classificacao_tributaria_ibs: string;

  @Column({ nullable: true })
  cst_cbs: string;

  @Column({ nullable: true })
  classificacao_tributaria_cbs: string;

  @Column({ nullable: true })
  classe_enquadramento_ipi: string;

  @Column({ nullable: true })
  codigo_enquadramento_ipi: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  aliquota_ipi: number;

  @Column({ nullable: true })
  sit_tributaria_ipi: string;

  @Column({ nullable: true })
  sit_tributaria_pis: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  aliquota_pis: number;

  @Column({ nullable: true })
  sit_tributaria_cofins: string;

  @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
  aliquota_cofins: number;

  @OneToOne(() => Product, (product) => product.nota_fiscal)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(() => ProductIvaItem, (item) => item.notaFiscal, {
    cascade: true,
  })
  iva_tabela: ProductIvaItem[];
}
