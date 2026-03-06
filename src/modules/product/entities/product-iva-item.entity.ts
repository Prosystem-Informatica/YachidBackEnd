import { BaseEntity } from 'src/config/db/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductNotaFiscal } from './product-nota-fiscal.entity';

@Entity('product_iva_items')
export class ProductIvaItem extends BaseEntity {
  @Column()
  estado: string;

  @Column({ type: 'decimal', precision: 15, scale: 4, default: 0 })
  valor: number;

  @ManyToOne(() => ProductNotaFiscal, (nf) => nf.iva_tabela, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_nota_fiscal_id' })
  notaFiscal: ProductNotaFiscal;
}
